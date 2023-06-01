import { FC, useState } from 'react';

const Searcher: FC = () => {
  const [active, setActive] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const setSearchToShow = (type: string) => {
    setActive(type);
    setShowSearch(true);
  };

  return (
    <main>
      {/* //Search button to show the main search  */}
      {showSearch && (
        <svg
          onClick={() => setShowSearch(false)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7  cursor-pointer text-gray-500 bg-gray-200 rounded-full p-1 float-right mt-[4px] "
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      {!showSearch ? (
        <section>
          <div className="flex items-center justify-center btn rounded-full border-gray-300 bg-white shadow-sm hover:bg-white   hover:border-gray-300">
            <div tabIndex={0} onClick={() => setSearchToShow('location')} className="cursor-pointer flex-1">
              <p className="text-gray-500 font-medium  normal-case ">Anywhere</p>
            </div>
            <div className="divider sm:divider-horizontal pt-3 pb-3" />
            <div tabIndex={1} onClick={() => setSearchToShow('check-in')} className="cursor-pointer flex-2 ">
              <p className="text-gray-500  font-medium  normal-case ">Any week</p>
            </div>
            <div className="divider sm:divider-horizontal pt-3 pb-3" />
            <div tabIndex={3} onClick={() => setSearchToShow('guest')} className="cursor-pointer flex-2  mr-2 ">
              <p className="text-gray-400  font-light  normal-case ">Add guests</p>
            </div>
            <div tabIndex={3} onClick={() => setSearchToShow('guest')} className="cursor-pointer flex-1">
              <div className="bg-[#329a9a] w-8 h-8  flex items-center justify-center rounded-full ">
                <svg
                tabIndex={3} 
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  fill=""
                  height="12px"
                  width="12px"
                  stroke-width="5.33333"
                  stroke="white"
                  overflow="visible"
                  display="block"
                >
                  <g fill="none">
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex items-center justify-center rounded-full border-gray-200 bg-gray-200 shadow-sm  h-20 px-5 hover:border-gray-300 mt-10 ">
            <div
              onClick={() => setActive('location')}
              tabIndex={0}
              className={`dropdown  ${
                active === 'location'
                  ? 'flex-2 mr-8 items-center flex justify-center  bg-white w-48 px-1 rounded-full h-16 '
                  : 'flex-2 mr-8 items-center flex justify-center w-48  hover:bg-gray-300 hover:w-48 px-1 hover:rounded-full hover:h-16'
              } cursor-pointer  `}
            >
              <div>
                <p className="text-black text-xs font-bold  normal-case">Where</p>
                <p className="text-gray-500 text-xs font-light  normal-case  ">Search destination</p>
              </div>
              <ul tabIndex={0} className="dropdown-content mt-52 menu p-2 shadow bg-base-100 rounded-box w-96">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>

            <div className="divider sm:divider-horizontal pt-6 pb-6 " />
            <div
              onClick={() => setActive('check-in')}
              tabIndex={1}
              className={`dropdown ${
                active === 'check-in'
                  ? 'cursor-pointer flex-1 mr-4 items-center flex justify-center bg-white w-32 px-1 rounded-full h-16 '
                  : 'cursor-pointer flex-1 mr-4 items-center flex justify-center w-32  hover:bg-gray-300 hover:w-32 px-1 hover:rounded-full hover:h-16 '
              }`}
            >
              <div>
                <p className="text-black text-xs font-bold  normal-case ">Check in</p>
                <p className="text-gray-500 text-xs font-light  normal-case ">Add dates</p>
              </div>
              <ul tabIndex={1} className="dropdown-content mt-52 menu p-2 shadow bg-base-100 rounded-box w-96">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
            <div className="divider sm:divider-horizontal pt-6 pb-6" />
            <div
              onClick={() => setActive('check-out')}
              tabIndex={2}
              className={`dropdown ${
                active === 'check-out'
                  ? 'cursor-pointer flex-2 ml-4 items-center flex justify-center bg-white w-32 px-1 rounded-full h-16'
                  : 'cursor-pointer flex-2 ml-4 items-center flex justify-center w-32 hover:bg-gray-300 hover:w-32 px-1 hover:rounded-full hover:h-16'
              }`}
            >
              <div>
                <p className="text-black text-xs font-bold  normal-case ">Check out</p>
                <p className="text-gray-500  text-xs font-light  normal-case ">Add dates</p>
              </div>
              <ul tabIndex={2} className="dropdown-content mt-52 menu p-2 shadow bg-base-100 rounded-box w-96">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
            <div className="divider sm:divider-horizontal pt-6 pb-6" />
            <div
              onClick={() => setActive('guest')}
              tabIndex={3}
              className={`dropdown ${
                active === 'guest'
                  ? 'items-center flex justify-center bg-white w-60 pl-5 rounded-full h-16'
                  : 'items-center flex justify-center  hover:bg-gray-300 w-60 hover:w-60 pl-5 hover:pl-5 hover:rounded-full hover:h-16'
              }`}
            >
              <div className="cursor-pointer flex-2  mr-5 ">
                <p className="text-black text-xs font-bold  normal-case ">Who</p>
                <p className="text-gray-400  text-xs font-light  normal-case ">Add guests</p>
              </div>
              <div className="cursor-pointer flex-1">
                <div className="bg-[#329a9a] h-12 w-32 flex items-center justify-center rounded-full ">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    fill=""
                    height="17px"
                    width="17px"
                    stroke-width="5.33333"
                    stroke="white"
                    overflow="visible"
                    display="block"
                  >
                    <g fill="none">
                      <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                    </g>
                  </svg>
                  <span className="text-white  font-light  normal-case text-lg  ml-3">Search</span>
                </div>
              </div>
              <ul tabIndex={3} className="dropdown-content mt-52 menu p-2 shadow bg-base-100 rounded-box w-96">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Searcher;
