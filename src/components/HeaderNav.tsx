import { FC } from 'react';
import Searcher from './Searcher';

const HeaderNav: FC = () => {
  return (
    <main>
      <div className="navbar bg-base-100 border-b-gray-200 border-b-2 p-5 ">
        <div className="navbar-start">
          <img alt="" className=" w-36" src="https://boggy-streetcar-558.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F65ad2e21-3c1a-499a-a5b2-52680a3a65b0%2FHostshare-green.png?id=34cbabc3-ed37-4b68-9bb0-3546d01875a7&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&width=2000&userId=&cache=v2" />
        </div>
        <div className="navbar-center hidden  sm:flex">
          <Searcher />
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeaderNav;
