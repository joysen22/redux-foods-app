import "./App.css";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useGetFoodsByNameQuery } from "./Redux/features/Foods/FoodsSlices";
function App() {
  const [search, setSearch] = useState("");
  const [modelData, setModelData] = useState({});
  const [modelShow, setModelShow] = useState(false);

  const { data, error, isLoading } = useGetFoodsByNameQuery(search);

  const modelsHandle = (id) => {
    // console.log(id);
    const newModelData = data?.meals?.find((item) => {
      setModelShow(true);
      return item.idMeal === id;
      // console.log(item.idMeal === id);
    });
    setModelData(newModelData);
  };

  return (
    <div className="App mt-0 min-h-screen w-full ">
      <h1 className=" text-2xl font-medium text-blue-700 text-center pt-5 ">
        Foods App
      </h1>
      <div className="search bg-red-200 w-fit h-fit mx-auto mt-10 relative">
        <input
          onChange={(event) => setSearch(event.currentTarget.value)}
          value={search}
          className="search-feild border border-solid border-slate-600 rounded pr-7 pl-2 py-1 font-medium outline-none"
          type="text"
          placeholder="Enter Food Name"
        />
        <FaSearch className=" search-icon absolute right-2 top-2" />
      </div>
      <div className="">
        {isLoading && <h1 className=" text-center mt-5">loading....</h1>}
        {error && (
          <h1 className=" text-center mt-5 text-red-800">somthing error</h1>
        )}
        {!data?.meals?.length > 0 && (
          <h1 className=" text-center font-medium text-red-700 text-lg mt-20 w-full  mx-auto">
            Food Not Found
          </h1>
        )}
      </div>
      {/* models box start */}
      {modelShow && (
        <div
          className={
            modelShow
              ? " w-full  z-50 top-10 h-fit rounded-lg bg-slate-200 p-2  fixed md:w-4/5 lg:w-3/5 md:right-10"
              : "hidden"
          }
        >
          <div className=" w-fit  mx-auto rounded bg-neutral-50 p-4  h-2/4 overflow-scroll   shadow-lg shadow-neutral-300  sm:mx-0 cursor-pointer">
            <div className="icon-close relative">
              <GrClose
                onClick={() => setModelShow(false)}
                className=" absolute right-2 top-2 pl-2 font-medium text-3xl"
              />
            </div>
            <img
              className="food-image rounded-lg mx-auto"
              src={modelData.strMealThumb}
              alt="img"
            />
            <p className=" mt-4 font-normal">
              {modelData?.strInstructions?.slice(0, 400)}
            </p>
          </div>
        </div>
      )}
      {/* models box end */}
      <div className="container flex flex-col gap-8 items-center sm:flex-none mt-20 p-8 sm:gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  sm:mx-auto">
        {data?.meals?.length > 0 &&
          data?.meals?.map((food) => {
            return (
              <div
                key={food.idMeal}
                className=" bg-neutral-100 p-4 w-fit h-fit mb-4 rounded-lg shadow-lg shadow-neutral-300 mx-auto sm:mx-0 hover:scale-110 transition-all duration-200 delay-200 cursor-pointer"
              >
                <img
                  className="food-image rounded-lg"
                  src={food.strMealThumb}
                  alt="foodImage"
                />
                <h1 className=" mt-2 mb-2 font-medium text-slate-800">
                  Name: <span className=" font-normal">{food.strMeal}</span>
                </h1>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => modelsHandle(food.idMeal)}
                    className=" text-teal-700 font-medium border-2 border-cyan-500 px-2 rounded hover:bg-cyan-500 hover:text-white transition-all delay-300 duration-300 "
                  >
                    Details
                  </button>
                  <a
                    className=" text-teal-700 font-medium border-2 border-cyan-500 px-2 rounded hover:bg-cyan-500 hover:text-white transition-all delay-300 duration-300"
                    href={food.strYoutube}
                  >
                    Youtube
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
