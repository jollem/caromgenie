const InfoLine = ({
  icon,
  data,
}: {
  icon: React.ReactNode;
  data: string | number;
}) => (
  <div>
    {icon}
    <span>{data}</span>
  </div>
);

export default InfoLine;
