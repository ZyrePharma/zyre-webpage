import React from 'react';
import Link from 'next/link';
import { MdLocationOn, MdArrowForwardIos } from 'react-icons/md';
import { BiSolidCoinStack } from 'react-icons/bi';
import { FaUser, FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

interface Job {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  vacancies: number;
  salaryRange: string;
  postedAgo: string;
  applicants: number;
}

const CareersCard = ({ job }: { job: Job }) => {
  return (
    <div className="w-[350px] bg-white shadow-md border border-gray-300 border-t-8 border-t-primary rounded-lg p-4 flex flex-col min-h-[320px]">
      <div className="flex flex-col gap-2 border-b-2 border-gray-200 flex-grow">
        <div className="flex justify-between ">
          <h1 className="text-primary text-lg font-bold">{job.title}</h1>
          <span className="text-xs self-start  whitespace-nowrap text-green-600 bg-green-100 py-1 px-2 rounded-2xl">
            {job.type}
          </span>
        </div>
        <div>
          <span className="inline-block text-[var(--color-blue-900)] text-xs bg-[var(--color-blue-50)] py-1 px-2 rounded-2xl">
            {job.category}
          </span>
        </div>
        <div className="flex flex-col gap-4 my-2">
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <MdLocationOn /> {job.location}
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <FaUser /> {job.vacancies} Vacancies
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <BiSolidCoinStack /> {job.salaryRange}
          </span>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between items-center my-2">
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <FaRegCalendarAlt />
            {job.postedAgo}
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <IoIosPeople />
            {job.applicants} Applicant/s
          </span>
        </div>
        <Link
          href={`/careers/${job.id}`}
          className="w-full flex justify-center items-center gap-2 text-xs text-white bg-primary py-1 px-2 rounded-md hover:bg-secondary transition-colors"
        >
          <span>View Details</span>
          <MdArrowForwardIos />
        </Link>
      </div>
    </div>
  );
};

export default CareersCard;
