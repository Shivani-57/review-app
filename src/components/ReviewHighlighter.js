import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

function ReviewHighlighter({content,analytics}) {
    function getSentimentColor(sentiment) {
        switch (sentiment) {
          case "Positive":
            return "#D9F2DD";
          case "Negative":
            return "#F2DBD9";
          case "Neutral":
            return "#eaf09b6b";
          case "Mixed":
            return "#e8bd6d3d";
          default:
            return "black";
        }
      }
      
      const highlightText = (text, analytics) => {
        let parts = [];
        let currentIndex = 0;
        const resolveIndex =(start,end)=>{
            console.log("In resolving index")
            if(start<0 && end>0){
                currentIndex = 0
                start = end
                end = start + text.length
                // return start,end
            }
            return [start,end]
            

        }
        analytics.forEach(({ highlight_indices,topic }) => {
          highlight_indices.forEach(([start, end, sentiment], index) => {
            console.log("Start: " + start + " " + end + " " + sentiment)
            // resolveIndex(start,end)
            // Add text before the highlightif
            if(start<0 || end <0){
                [start,end]=resolveIndex(start,end)
                console.log("after the resolve index: " + start + " " + end)
            }
            if (start > currentIndex) {
              parts.push(text.slice(currentIndex, start));
            }
            // Add the highlighted text
            parts.push(
                <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={topic}
                placement="top"
                sx={{
                    top: '-10px', // Adjust this value to position the tooltip above the text
                  }}
            arrow
              >
              <span key={index}  className="cursor-pointer"
              style={{ backgroundColor: getSentimentColor(sentiment) }}>
                {text.slice(start, end)}
                
                </span>
          </Tooltip>
          
              
            );
            currentIndex = end;
          });
        });
    
        // Add the remaining text after the last highlight
        if (currentIndex < text.length) {
          parts.push(text.slice(currentIndex));
        }
    
        return parts;
      };
  return (
<>
     
<div className=" py-4 shadow-sm">
      <p className="text-gray-800 text-lg leading-relaxed">
        {highlightText(content, analytics)}
      </p>
    </div>
       
    </>
  )
}



export default ReviewHighlighter