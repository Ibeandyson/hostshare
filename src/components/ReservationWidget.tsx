import { FC } from 'react';

const ReservationWidget: FC = () => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl  border-black border-[0.2px] ">
        <div className="card-body">
          <div className="flex">
            <div className="flex">
              <p className="font-bold text-[25px] mt-[-10px] ">$40</p>
              <p className="text-sm ml-3 font-extralight">night</p>
            </div>

            <div className="ml-auto flex">
              <div className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0">
                  <path d="M10 1L12.55 6.39L18 7.36L14.5 11.14L15.42 16.61L10 14.73L4.58 16.61L5.5 11.14L2 7.36L7.45 6.39L10 1z" />
                </svg>
              </div>
              <p className="ml-1 text-[15px] font-semibold ">5.5 .</p>
              <p className="underline font-light  ml-1 text-[15px]"> 86 reviews</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex ">
              <button className="btn bg-transparent hover:bg-transparent  text-black border-[0.2px] w-40 h-14 rounded-b-none rounded-tr-none">
                <div>
                  <p className="font-bold text-[10px] text-left mb-2">CHECK-IN</p>
                  <p className="font-light text-[15px] text-left ">6/30/2023</p>
                </div>
              </button>
              <button className="btn bg-transparent hover:bg-transparent text-black border-[0.2px] w-40 h-14 rounded-b-none rounded-tl-none">
                <div>
                  <p className="font-bold text-[10px] text-left mb-2 ">CHECK-OUT</p>
                  <p className="font-light text-[15px] text-left ">6/30/2023</p>
                </div>
              </button>
            </div>
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn w-80 rounded-t-none bg-transparent hover:bg-transparent text-black border-[0.2px]">
                Guest
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 justify-items-center shadow bg-base-100 rounded-box w-80 h-14">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 mb-10">
            <button className="btn normal-case bg-[#dc0e63]  hover:bg-[#dc0e63] text-white border-[0.2px] w-80">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationWidget;
