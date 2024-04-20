import CompanyCard from "./components/CompanyCard";
import Header from "../../components/Header";
import JobCard from "./components/JobCard";

const topEmployersData = [
  {
    id: 1,
    logo: "/path-to-mb-bank-logo.png",
    name: "MB Bank",
    skills: ["Java", "JavaScript", "Golang", "ReactJS", "Oracle", "AngularJS"],
    location: "Ha Noi",
    jobsCount: 7,
  },
  {
    id: 2,
    logo: "/path-to-lg-logo.png",
    name: "LG Electronics Development Vietnam (LGEDV)",
    skills: ["C++", "Tester", "OOP", "Embedded", "Android", "C++"],
    location: "Ha Noi - Da Nang - Others",
    jobsCount: 5,
  },
  {
    id: 3,
    logo: "/path-to-persol-logo.png",
    name: "Persol Career Tech Studio Vietnam",
    skills: [".NET", "TypeScript", "Spring", "AWS", "Azure", "Agile"],
    location: "Ho Chi Minh",
    jobsCount: 5,
  },
  {
    id: 4,
    logo: "/path-to-mb-bank-logo.png",
    name: "MB Bank",
    skills: ["Java", "JavaScript", "Golang", "ReactJS", "Oracle", "AngularJS"],
    location: "Ha Noi",
    jobsCount: 7,
  },
  {
    id: 5,
    logo: "/path-to-lg-logo.png",
    name: "LG Electronics Development Vietnam (LGEDV)",
    skills: ["C++", "Tester", "OOP", "Embedded", "Android", "C++"],
    location: "Ha Noi - Da Nang - Others",
    jobsCount: 5,
  },
  // Add more employers as needed
];

const jobsData = [
  {
    id: 1,
    title: "5 Mid - Senior Java Developers (SQL, Spring)",
    company: "Goline Corporation",
    isNew: true,
    isHot: false,
    isSuperHot: false,
    salary: "Up to $2600",
    features: ["You'll love it", "At office"],
    tags: ["Java", "SQL", "Spring"],
    location: "Ha Noi",
    postedDate: "Posted 1 hour ago",
  },
  {
    id: 2,
    title: "20 Fullstack Dev (Java, Spring, Angular)",
    company: "LEAP",
    isNew: true,
    isHot: false,
    isSuperHot: false,
    salary: "Up to $3000",
    features: ["Fresher Accepted", "At office"],
    tags: ["Java", "Spring", "Angular"],
    location: "Ho Chi Minh",
    postedDate: "Posted 6 hours ago",
  },
  {
    id: 3,
    title: "Backend Developer (Java/Spring/MySQL) - All Levels",
    company: "MB Bank",
    isNew: false,
    isHot: false,
    isSuperHot: true,
    salary: "Negotiable",
    features: ["You'll love it", "Fresher Accepted", "At office"],
    tags: ["Java", "MySQL", "Spring"],
    location: "Ha Noi",
    postedDate: "Posted 1 day ago",
  },
  {
    id: 4,
    title: "Senior/Lead Java Developer (Spring, PostgreSQL)",
    company: "Rakus Vietnam Company",
    isNew: false,
    isHot: true,
    isSuperHot: false,
    salary: "1,300 - 2,200 USD",
    features: ["At office"],
    tags: ["Java", "PostgreSQL", "Spring"],
    location: "Ho Chi Minh",
    postedDate: "Posted 1 day ago",
  },
  {
    id: 5,
    title: "Java Fullstack Developer (Spring) Up to $2600",
    company: "Integro Technologies",
    isNew: false,
    isHot: false,
    isSuperHot: true,
    salary: "Up to $2600",
    features: ["At office"],
    tags: ["Java", "JavaScript", "Spring"],
    location: "Ha Noi",
    postedDate: "Posted 5 days ago",
  },
  // Add more job objects as needed
];

const Home = () => {
  return (
    <>
      <Header />
      <div className="p-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-center text-3xl font-bold mb-10">Employers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topEmployersData.map((employer) => (
              <CompanyCard key={employer.id} data={employer} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-center text-3xl font-bold mb-10">
            189 IT Jobs for you
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobsData.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <button className="text-red-500 flex m-auto hover:text-red-700 font-semibold py-2 px-4 border border-red-500 hover:border-red-700 rounded mt-4">
            View all jobs
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
