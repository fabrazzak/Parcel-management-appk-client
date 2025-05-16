import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-3 text-center text-sm border-t bg-[#F7F7F7] dark:bg-black border-gray-200 ">
      <p>&copy; {new Date().getFullYear() } Abdur Razzak . All rights reserved.</p>
    </footer>
    );
};

export default Footer;