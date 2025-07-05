This repository has been moved to https://codeberg.org/Dublin-Digital-Radio/rpi-broadcast-unit.

# ddr. Mobile Broadcasting Unit

## Hardware

- [Raspberry Pi 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
- [Waveshare 2.8inch DPI LCD touchscreen](https://www.waveshare.com/wiki/2.8inch_DPI_LCD#Rotation_.28Working_with_Raspberry_Pi.29)

## Software

- Darkice
- Unclutter
- xserver-xorg-input-libinput
- Node.js

## Getting Started

1. Using [Raspberry Pi Imager](https://www.raspberrypi.com/software/), install Raspberry Pi OS Bookworm on an SD card.
2. Follow the instructions on [https://www.waveshare.com/wiki/2.8inch_DPI_LCD](https://www.waveshare.com/wiki/2.8inch_DPI_LCD) to update `config.txt` and install .dtbo files on the SD card.
3. Boot up the Pi, update packages and use `raspi-config` to switch from Wayland to X11.
4. Follow further instructions on [https://www.waveshare.com/wiki/2.8inch_DPI_LCD](https://www.waveshare.com/wiki/2.8inch_DPI_LCD) to update the `autostart` script and `libinput` config to rotate the screen.
5. Update the `autostart` script to automatically start up the user interface when booted. Your `autostart` script should look like below.

   ```
   @lxpanel --profile LXDE-pi
   @pcmanfm --desktop --profile LXDE-pi
   @xscreensaver -no-splash

   #0: rotate 0 degrees; 1: rotate 270 degrees; 2: rotate 180 degrees; 3: rotate 90 degrees
   xrandr -o 3
   unclutter -idle 0
   node /home/pi/rpi-broadcast-unit/server/main.js
   sleep 5000
   chromium-browser --kiosk http://localhost:8080
   ```

## Development (Linux only)

```
docker compose up
```
