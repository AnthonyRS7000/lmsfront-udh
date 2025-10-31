import '../css/SectionHeader.css';

const SectionHeader: React.FC<{ icon: JSX.Element; title: string }> = ({ icon, title }) => (
  <div className="section-header-body">
    {icon}
    <h3 className="section-header-title">{title}</h3>
  </div>
);

export default SectionHeader;