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

## Development (Linux only)

```
docker compose up
```
