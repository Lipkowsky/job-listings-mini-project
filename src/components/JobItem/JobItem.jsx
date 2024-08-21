import React from "react";
import "./JobItem.css";

const JobTag = ({ tag, onTagClick }) => (
  <div
    onClick={() => onTagClick(tag)}
    className="bg-light-grayish-cyan-filter text-desaturated-dark-cyan hover:text-white font-bold hover:bg-desaturated-dark-cyan cursor-pointer rounded md:px-2 md:py-1 items-center"
  >
    <span className="inline-flex items-center px-2 md:px-2 md:py-1 text-xs md:text-md">
      {tag.value}
    </span>
  </div>
);

const JobHeader = ({ job }) => (
  <div className="flex items-center text-center">
    <span className="font-semibold text-desaturated-dark-cyan text-md">
      {job.company}
    </span>
    {job.new && (
      <div className="ml-2 px-[0.5rem] pt-[0.1rem] rounded-xl text-white bg-desaturated-dark-cyan text-center">
        <span className="text-[0.85rem] font-bold">NEW!</span>
      </div>
    )}
    {job.featured && (
      <div className="ml-2 px-[0.5rem] pt-[0.1rem] rounded-xl text-white bg-black text-center">
        <span className="text-[0.85rem] font-bold">FEATURED</span>
      </div>
    )}
  </div>
);

const JobDetails = ({ job }) => (
  <div className="ml-4 flex flex-col gap-y-2 mt-6 md:mt-0">
    <JobHeader job={job} />
    <div className="font-semibold md:text-[1.5rem] text-md">
      {job.position}
    </div>
    <div className="flex items-center text-dark-grayish-cyan">
      <div className="item-separator">{job.postedAt}</div>
      <div className="item-separator">{job.contract}</div>
      <div className="item-separator">{job.location}</div>
    </div>
  </div>
);

const createTagsListing = (job) => {
  return [
    ...job.languages.map((language) => ({ tag: "language", value: language })),
    ...job.tools.map((tool) => ({ tag: "tool", value: tool })),
    { tag: "level", value: job.level },
    { tag: "role", value: job.role },
  ];
};

const JobItem = ({ job, setFilters, filters }) => {
  const handleTagClick = (item) => {
    // Check is filter is on list
    if (!filters.some(filter => filter.tag === item.tag && filter.value === item.value)) {
      setFilters([...filters, item]);
    }
  };

  return (
    <div className="bg-white grid grid-cols-[5px__1fr]">
      <div className="border-desaturated-dark-cyan h-full border bg-desaturated-dark-cyan rounded-tl-xl rounded-bl-xl"></div>
      <div className="rounded shadow-2xl grid grid-rows-[1fr, max-content, 1fr] grid-cols-1 lg:grid-cols-2 xl:grid-rows-1 pt-6 pb-4">
        <div className="flex relative md:static pb-4">
          <div className="md:pl-4 pl-2 md:py-4 flex md:flex-cols">
            <img
              src={job.logo}
              className="md:object-fit md:static absolute bottom-[8rem] left-4 md:h-20 h-12"
              alt={`${job.company} logo`}
            />
            <JobDetails job={job} />
          </div>
        </div>
        <hr className="row-span-2 opacity-40 border-t-[1px] border-dark-grayish-cyan md:hidden ml-6 mr-6" />
        <div className="md:flex grid grid-cols-[max-content,max-content,max-content] md:justify-end items-center gap-4 text-center p-6 md:pr-12">
          {createTagsListing(job).map((item, index) => (
            <JobTag key={index} tag={item} onTagClick={handleTagClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobItem;
