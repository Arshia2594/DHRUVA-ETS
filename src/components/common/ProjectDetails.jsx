
import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import HeaderImage from "../../assets/images/Industrial-Automation.jpg";
import avatar1 from "../../assets/images/team-1.jpg";
import avatar2 from "../../assets/images/team-2.jpg";

// Heroicons
import {
  CalendarDaysIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon as HourglassIcon,
} from "@heroicons/react/24/outline";

import MDAvatarGroup from "./MDAvatarGroup";

const ProjectDetails = () => {
  const { id } = useParams(); // 🆔 Get project ID from route
  const { data: project, loading, error } = useAxios(`/project/get-project-by-id/${id}`);

  const avatars = [
    { src: avatar1, alt: "Avatar 1", name: "Priyanka" },
    { src: avatar2, alt: "Avatar 2", name: "Shyamala" },
  ];

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading project</div>;
  if (!project) return <div className="text-center text-gray-500">No project found</div>;

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={HeaderImage} alt="Project Header" className="w-full h-40 object-cover" />

      <div className="p-6">
        {/* Project Title */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            {project.ProjectName} [ {project.ProjectCode} ]
          </h2>
          <p className="text-gray-600">Manager: {project.Manager}</p>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-blue-900" />
            <div>
              <div className="font-semibold">Project Start</div>
              <div>{project.ProjectStartDate}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-blue-900" />
            <div>
              <div className="font-semibold">Project End</div>
              <div>{project.ProjectEndDate || "N/A"}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HourglassIcon className="h-5 w-5 text-blue-900" />
            <div>
              <div className="font-semibold">Status</div>
              <div>{project.CompletionStatus}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-blue-900" />
            <div>
              <div className="font-semibold">Total Members</div>
              <div>{project.Members?.length || 0}</div>
            </div>
          </div>
        </div>

        {/* Avatar Group */}
        <div className="mt-4 flex justify-end">
          <MDAvatarGroup
            avatars={project.Members?.map((m, i) => ({
              name: m.FirstName,
              src: i % 2 === 0 ? avatars[0].src : avatars[1].src,
            }))}
            max={5}
            size="large"
          />
        </div>

        {/* Work History */}
        <hr className="my-6 border-t" />
        <h3 className="font-semibold mb-4">Work History</h3>

     
        <div className="text-gray-500 italic">No work history data yet.</div>
      </div>
    </div>
  );
};

export default ProjectDetails;
