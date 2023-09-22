const InfoLine = ({
  icon,
  data,
}: {
  icon: React.ReactNode;
  data: string | number;
}) => (
  <div className="infoline">
    {icon}
    <span>{data}</span>
  </div>
);

export default InfoLine;
