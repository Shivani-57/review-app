import React from "react";
import data from "../data/data.json";
import ReviewHighlighter from "./ReviewHighlighter";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function ReviewList() {
    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating/2) {
            stars.push(<StarIcon key={i} style={{ color: '#FFD700' }} />);
          } else {
            stars.push(<StarBorderIcon key={i} style={{ color: '#FFD700' }} />);
          }
        }
        return stars;
      };
  return (
    <div>
      {data.map((item, index) => (
        <>
        <div className="">
        <div className="flex   py-1 shadow-md ">
            <div className="">
                <img src={item.source.icon} alt="source logo" className="w-8 h-8 p-1 rounded-full"></img>
            </div>
            <div className="flex flex-col flex-1 px-2 ">
        <div className="flex justify-between  text-lg">
        <div className="flex">
        <div className="pr-1 py-1 font-semibold">{item.reviewer_name}</div>
        <div className="py-1 tracking-tighter">wrote a review at</div>
        <div className="p-1 font-semibold">{item.source.name}</div>
        </div>
        <div className=" flex items-center space-x-2">
            <PersonAddAltIcon  fontSize="small" />
            <BookmarkBorderIcon fontSize="small" />
            <MoreHorizIcon fontSize="small" />
        </div>
        </div>
        <div className=" flex space-x-5 py-1">
        <div className="flex items-center">
        {renderRating(item.rating_review_score)}
      </div>
        <div className="text-base tracking-tight">{item.date}</div>
        </div>
        <ReviewHighlighter content={item.content} analytics={item.analytics} />
        </div>
        </div>
        </div>
        </>
      ))}
    </div>
  );
}


export default ReviewList;
