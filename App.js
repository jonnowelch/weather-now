import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import {
  tempFormatter,
  dateUnixConverter,
  capitaliseWeather,
} from "./utils/utils";
import Header from "./shared/Header";
import ChangeCity from "./shared/changeCity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Col, Grid, Row } from "react-native-easy-grid";
import { APIkey } from "./APIkey";
import { weatherImages } from "./shared/weatherImages";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      city: "Manchester",
      country: "uk",
      isLoading: true,
      modalOpen: false,
    };
  }

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},uk&APPID=${APIkey}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getNewCityData = (city, country) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=64a619826f3f25b2ab4001facc7e75e2`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          throw new Error("Location not valid");
        } else {
          this.setState({ data: json });
          this.setState({ isLoading: false });
          this.closeModal();
        }
      })
      .catch((e) => {
        Alert.alert(
          "Location Error",
          "Location not found, please check your spelling and try again",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            { text: "OK", onPress: () => {} },
          ],
          { cancelable: false }
        );
        this.setState({
          data: {
            main: {
              feels_like: "N/A",
              temp: "N/A",
              temp_max: "N/A",
              temp_min: "N/A",
            },
            name: "Location not found",
            sys: {
              sunrise: "N/A",
              sunset: "N/A",
            },
            weather: [
              {
                description: "N/A",
                icon: "N/A",
              },
            ],
          },
        });
      });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { data, isLoading, modalOpen } = this.state;

    return (
      <View style={styles.main}>
        <Header />
        {isLoading ? (
          <ActivityIndicator size='large' color='#dd6e42' />
        ) : (
          <View style={styles.loadedData}>
            <View>
              <Modal animationType='slide' visible={modalOpen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.modal}>
                    <MaterialCommunityIcons
                      style={styles.modalClose}
                      name='close-box'
                      size={40}
                      color='black'
                      onPress={() => this.closeModal()}
                    />
                    <View style={styles.cityChange}>
                      <ChangeCity getNewCityData={this.getNewCityData} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            <View>
              <Grid style={styles.cityChooser}>
                <Col size={9}>
                  <Text style={styles.city}>
                    {data.name}, {data.sys.country}
                  </Text>
                </Col>
                <Col size={1}>
                  <MaterialCommunityIcons
                    style={styles.modalClose}
                    name='magnify'
                    size={24}
                    color='#E0FBFC'
                    onPress={() => this.openModal()}
                  />
                </Col>
              </Grid>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.temp}>{tempFormatter(data.main.temp)}°c</Text>
            <View style={styles.container}>
              <Grid style={styles.infoGrid}>
                <Col>
                  <Text style={styles.infoGrid}>
                    Feels like: {tempFormatter(data.main.feels_like)}°c
                  </Text>

                  <Text style={styles.infoGrid}>
                    Max Temp: {tempFormatter(data.main.temp_max)}°c
                  </Text>

                  <Text style={styles.infoGrid}>
                    Min Temp: {tempFormatter(data.main.temp_min)}°c
                  </Text>
                </Col>
                <Col>
                  <Image source={weatherImages.weather[data.weather[0].icon]} />

                  <Text style={styles.infoGrid}>
                    {" "}
                    {capitaliseWeather(data.weather[0].description)}
                  </Text>
                </Col>
              </Grid>
              <Grid style={styles.sunDivider}>
                <Col>
                  <Text style={styles.infoGrid}>
                    Sunrise: {dateUnixConverter(data.sys.sunrise)}
                  </Text>
                </Col>
                <Col>
                  <Text style={styles.infoGrid}>
                    Sunset: {dateUnixConverter(data.sys.sunset)}
                  </Text>
                </Col>
              </Grid>
              <Grid>
                <Col>
                  <Image
                    style={styles.sunPics}
                    source={require("./assets/sunrise.png")}
                  />
                </Col>
                <Col>
                  <Image
                    style={styles.sunPics}
                    source={require("./assets/sunset.png")}
                  />
                </Col>
              </Grid>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 24,
    backgroundColor: "grey",
    alignItems: "stretch",
    flex: 1,
  },
  loadedData: {
    flexDirection: "column",
    flex: 1,
  },

  city: {
    fontWeight: "bold",
    color: "#E0FBFC",
    textAlign: "center",
    fontSize: 40,
  },
  temp: {
    color: "#E0FBFC",
    textAlign: "center",
    fontSize: 100,
  },

  infoGrid: {
    color: "#E0FBFC",
    textAlign: "left",
    fontSize: 19,
    fontWeight: "bold",
    padding: 5,
  },
  textInput: {
    backgroundColor: "#E0FBFC",
    fontSize: 20,
    borderRadius: 1,
    textAlign: "center",
    borderRadius: 15,
    color: "grey",
  },
  sunDivider: {
    paddingTop: 240,
  },
  sunPics: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  modal: {
    backgroundColor: "grey",
    flex: 1,
  },
  modalClose: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "white",
    paddingTop: 20,
  },
  divider: { paddingTop: 100 },
});
