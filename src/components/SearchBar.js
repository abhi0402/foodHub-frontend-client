import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MyLocation from "@material-ui/icons/MyLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";

import axios from "axios";

import { fetchRestaurantsByAddress } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 860,
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  results: {
    position: "absolute",
    bottom: -166,
    left: "26%",
    zIndex: 999,
    width: 760,
    height: "15%",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const [address, setAddress] = useState(
    localStorage.getItem("location") || ""
  );

  const page = props.page;

  const dispatch = useDispatch();

  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        getUserAddressBy(position.coords.latitude, position.coords.longitude);
      },
      function (error) {
        alert("The Locator was denied, Please add your address manually");
      }
    );
  };

  const handleSelect = async (value) => {
    if (value === "") localStorage.removeItem("location");
    else localStorage.setItem("location", value);
    setAddress(value);
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    if (latlng) localStorage.setItem("latlng", `${latlng.lat}, ${latlng.lng}`);
    fetchRestByLocation(latlng);
  };

  const fetchRestByLocation = (latlng) => {
    dispatch(fetchRestaurantsByAddress(latlng.lat, latlng.lng));
    props.action(true);
  };

  const handleSearch = (event) => {
    props.handleSearch(event.target.value);
  };

  const getUserAddressBy = (lat, long) => {
    const latlng = {
      lat: lat,
      lng: long,
    };
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((result) => {
        console.log(result.data);
        if (result.data.results[0].formatted_address === "")
          localStorage.removeItem("location");
        else
          localStorage.setItem(
            "location",
            result.data.results[0].formatted_address
          );
        setAddress(result.data.results[0].formatted_address);
        fetchRestByLocation(latlng);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper
      component="form"
      className={page !== "items" ? classes.rootHome : classes.rootItems}
    >
      {page === "home" && <LocationOn className={classes.iconButton} />}

      {page === "items" && (
        <InputBase
          className={classes.input}
          placeholder="Search Items"
          onChange={handleSearch}
          inputProps={{ "aria-label": "search for items" }}
        />
      )}

      {page === "home" && (
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <>
              <InputBase
                {...getInputProps({
                  placeholder: "Enter delivery address",
                })}
                className={classes.input}
                inputProps={{
                  "aria-label": "search google maps for delivery address",
                }}
              />
              <div className={classes.results}>
                {loading ? <div>Getting Results...</div> : null}

                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                    : { backgroundColor: "#fff", cursor: "pointer" };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      )}
      <SearchIcon className={classes.iconButton} />

      {page === "home" && (
        <>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
            onClick={getBrowserLocation}
          >
            <MyLocation />
          </IconButton>
        </>
      )}
    </Paper>
  );
}
