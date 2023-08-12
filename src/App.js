import "./App.css";
import { useState, useEffect } from "react";
import ContentContainer from "./components/ui/ContentContainer";
import Slots from "./components/Slots";
import data from "./components/data/data";
import LastBooking from "./components/LastBooking";
import { Seats } from "./components/Seats";

//loader imported
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
  // initial state of our app 
  const [movieData, setmovieData] = useState({
    movie: "",
    timeSlot: "",
    seat: [],
  });

  //save the fetched data
  const [fetchedData, setfetchedData] = useState([]);

 
  const [isLoading, setLoading] = useState(false)

 
  const { movies, slots, seats } = data;

  // collects the seats data
  const handleSeats = (seatData) => {
    const findSeat = movieData.seat.findIndex(
      (el) => el.seatName === seatData.seatName
    );

    if (findSeat !== -1) {
      const newSeatData = [...movieData.seat];
      newSeatData[findSeat] = seatData;
      setmovieData((prev) => {
        return {
          ...prev,
          seat: newSeatData,
        };
      });
    } else {
      setmovieData((prev) => {
        return {
          ...prev,
          seat: [...prev.seat, seatData],
        };
      });
    }
  };
  


  const getData = async () => {
    return fetch("https://bms-fullstack.onrender.com/api/booking")
      .then((data) => data.json())
      .then((data) => setfetchedData(data))
      .catch((err) => console.log(err));
  };

  // sends the collected state to the db and update
  const handelPost = async (data) => {
    return fetch("https://bms-fullstack.onrender.com/api/booking", {      
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        return setfetchedData(data);
      })

      .then((data) => {
        return setLoading(false);
      })

      .catch((err) => console.log(err));
      
  }

 
  useEffect(() => {
    getData();
  }, []);

 
  const handleMovie = (selectedMovie) => {
    setmovieData((prev) => {
      return {
        ...prev,
        movie: selectedMovie,
      };
    });
  };

  const handleTime = (selectedTime) => {
    setmovieData((prev) => {
      return {
        ...prev,
        timeSlot: selectedTime,
      };
    });
  };
 
  const handleSubmit = () => {
    
    const { movie, seat, timeSlot } = movieData;
    if (movie === "" || timeSlot === "" || seat.length <= 0) {
      alert("Please select every field to continue further");
      return;
    } else setLoading(true)

    return handelPost(movieData);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="left">
          <ContentContainer label={"Select A Movie"}>
            {movies.map((el, i) => (
              <Slots
                label={el}
                key={i}
                cb={handleMovie}
                movieData={movieData.movie}
              />
            ))}
          </ContentContainer>

          <ContentContainer label={"Select a Time Slot"}>
            {slots.map((el, i) => (
              <Slots
                label={el}
                key={i}
                movieData={movieData.timeSlot}
                cb={handleTime}
              />
            ))}
          </ContentContainer>

          <ContentContainer label={"Select the Seats"}>
            <Seats seats={seats} cb={handleSeats} data={fetchedData} />
          </ContentContainer>

          <div className="submit-btn">
            <button onClick={handleSubmit}><b>Submit!</b></button>

          </div>
        </div>
        <div className="right">
        {
          isLoading ? 
          <LoadingSpinner />
          : 
          <LastBooking data={fetchedData} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
