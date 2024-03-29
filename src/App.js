import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import Updateprofile from "./components/updateprofile/Updateprofile";
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import NotLoggedIn from "./components/NotLoggedIn";
import toast, { Toaster } from 'react-hot-toast';
import Loading from "./components/Loading/Loading";
import Search from "./components/Search/Search";
import CreatePost from "./components/createPost/CreatePost";



export const TOAST_SUCCESS = 'toast_success';
export const TOAST_FAILURE = 'toast_failure'






function App() {
  const isloading = useSelector(state => state.appConfigReducer.isLoading)

  const toastData = useSelector(state => state.appConfigReducer.toastData)

  const loadingRef = useRef(null);

  useEffect(() => {
    if (isloading) {
      loadingRef.current?.continuousStart();

    } else {
      loadingRef.current?.complete();
    }


  }, [isloading])
  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)

        break;
      case TOAST_FAILURE:
        if (toastData.message.message === "Invalid access key.") {
          return;
        }
        toast.error(toastData.message.message)

        break;

      default:


    }

  }, [toastData])


  const isSpinning = useSelector(s => s.appConfigReducer.isSpinning)



  return (
    <>

      <LoadingBar height={4} color={"linear-gradient(to right, #FFD700, #FF8C00, #FF4500, #8B0000)"}  ref={loadingRef} />
      <div><Toaster /></div>


      {isSpinning && <Loading />}



      <Routes>


        <Route element={<RequireUser />}>

          <Route element={<Home />} >
            <Route path="/" element={<Feed />}  ></Route>
            <Route path="/profile/:userId" element={<Profile />}  ></Route>
            <Route path="/profile/update" element={<Updateprofile />}  ></Route>
            <Route path="/search" element={<Search />}  ></Route>
            <Route path="/createpost" element={<CreatePost />}  ></Route>
          </Route>

        </Route>


        <Route element={<NotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>


    </>
  );
}

export default App;
