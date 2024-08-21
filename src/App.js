import { useEffect, useState, useCallback } from "react";
import JobItem from "./components/JobItem/JobItem";

const Header = () => (
  <div className="header">
    <picture className="h-full w-full">
      <source
        srcSet="./images/bg-header-desktop.svg"
        media="(min-width: 768px)"
      />
      <img
        src="./images/bg-header-mobile.svg"
        alt="header-img"
        className="h-full w-full object-cover bg-desaturated-dark-cyan"
      />
    </picture>
  </div>
);

const FilterTag = ({ filter, onDelete }) => (
  <div className="flex items-center my-1 h-8 bg-light-grayish-cyan-filter text-desaturated-dark-cyan rounded">
    <div className="flex-shrink-0 px-3 flex items-center">
      <span className="font-semibold text-[0.7rem]">{filter.value}</span>
    </div>
    <div
      onClick={() => onDelete(filter)}
      className="flex-grow h-8 rounded-tr-md rounded-br-md flex cursor-pointer items-center justify-center bg-desaturated-dark-cyan text-white px-3"
    >
      <span className="text-[0.7rem] font-bold">X</span>
    </div>
  </div>
);

const FilterBar = ({ filters, onDeleteFilter, onClearFilters }) => (
  <div className="absolute top-[17vh] md:mx-32 mx-4 rounded shadow-2xl pl-5 left-0 right-0 z-10 bg-white grid grid-cols-[4fr_1fr] items-center py-2 ">
    <div className="flex flex-wrap gap-5 w-full items-center min-h-16 max-h-24 overflow-y-auto">
      {filters.map((filter, index) => (
        <FilterTag key={index} filter={filter} onDelete={onDeleteFilter} />
      ))}
    </div>
    <div onClick={onClearFilters} className="md:ml-auto cursor-pointer md:mr-10">
      <span className="text-desaturated-dark-cyan underline">Clear</span>
    </div>
  </div>
);

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/mocks/data.json");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteFilter = useCallback(
    (filter) => setFilters((prevFilters) => prevFilters.filter((e) => e.value !== filter.value)),
    []
  );

  const clearFilters = useCallback(() => setFilters([]), []);

  const filterJobOffers = useCallback((offers, filters) => {
    return offers.filter((offer) =>
      filters.every((filter) => {
        switch (filter.tag) {
          case "language":
            return offer.languages.includes(filter.value);
          case "tool":
            return offer.tools.includes(filter.value);
          case "level":
            return offer.level === filter.value;
          case "role":
            return offer.role === filter.value;
          default:
            return false;
        }
      })
    );
  }, []);

  const filteredJobs = filters.length > 0 ? filterJobOffers(jobs, filters) : jobs;

  return (
    <div className="bg-light-grayish-cyan min-h-screen grid grid-rows-[20vh_1fr] md:grid-rows-[20vh_1fr] relative">
      <Header />
      <FilterBar
        filters={filters}
        onDeleteFilter={deleteFilter}
        onClearFilters={clearFilters}
      />
      <div className="mt-32 mb-32 md:mx-32 mx-4">
        <div className="grid grid-auto-rows-auto md:gap-y-6 gap-y-10">
          {filteredJobs.map((job) => (
            <JobItem
              key={job.id}
              job={job}
              setFilters={setFilters}
              filters={filters}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
