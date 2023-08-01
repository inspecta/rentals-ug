const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="
      bg-[#06112a] text-gray-200 text-sm text-center font-thin p-4 bottom-0
      fixed w-full"
    >
      Copyright
      {' '}
      {year}
      {'. '}
      All rights reserved | Created By Derrick
    </div>
  );
};

export default Footer;
