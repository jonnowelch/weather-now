# WeatherNow!

## React Native App

Thanks for looking at my repo for my WeatherNow! app.

This app uses the API from https://openweathermap.org/ to show weather information for any location around the world.

To use this app you will need Node.js installed on your device from https://nodejs.org/en/

To download this app

```bash
git clone https://github.com/jonnowelch/weather-now.git
```

into the relevant directory on your computer. Then enter into the app and open it in a code editor, I used Visual Studio Code.

```bash
cd weather-now
code .
```

Once opened, install the relevant packages used to create the app by typing in your terminal:

```bash
npm init -y
```

Then to run the app on your device or an emulator

```bash
npm run start
```

This will launch the Expo Developer in your browser. You can then scan the QR code on expo client on your phone, or send the app to an emulator.

This is a react native app made using Javascript. It calls on the open API from https://openweathermap.org/ and displays current weather conditions for anywhere in the world. By clicking on the magnifying glass you open a modal to an input form to change the location and info displayed on screen. There is a dropdown of all countries listed on the site that are available. This is done to help with common location names, ie Manchester GB, Manchester US.

Packages used:

Formik forms - Allows easy capture of data and inline validation \
react-native-easy-grid - Allows grid layout to be used easily \
react-native-picker-select - A more customisable dropdown menu than the standard Picker \
Mocha & Chai - Utility functions in the app were created using TDD and tested using Mocha and Chai.
