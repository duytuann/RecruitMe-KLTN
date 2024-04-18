const JobCard = ({job}) => {
  const {
    title,
    company,
    isNew,
    isHot,
    isSuperHot,
    salary,
    features,
    tags,
    location,
    postedDate,
  } = job;

  const badgeClass = {
    new: "bg-blue-100 text-blue-800",
    hot: "bg-red-100 text-red-800",
    superHot: "bg-red-600 text-white",
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {isNew && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${badgeClass.new}`}
          >
            NEW FOR YOU
          </span>
        )}
        {isHot && !isNew && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${badgeClass.hot}`}
          >
            HOT
          </span>
        )}
        {isSuperHot && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${badgeClass.superHot}`}
          >
            SUPER HOT
          </span>
        )}
      </div>
      <div className="mb-4">
        <span className="text-sm font-medium">{company}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-green-600 font-bold">{salary}</span>
        <span className="text-xs text-gray-500">{postedDate}</span>
      </div>
      <div className="flex flex-wrap mt-4 mb-2">
        {features.map((feature, index) => (
          <span key={index} className="text-xs text-gray-600 mr-2 mb-2">
            {feature}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600 mt-4">{location}</div>
    </div>
  );
};

export default JobCard;
