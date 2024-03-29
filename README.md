# Aims

This is an experimental repository where exchanges, discussions, experiments, and actual work are channelled towards porting/rewriting Morse Runner as a (universal) webapp. 

Morse Runner is a widely known, Windows-only (http://www.dxatlas.com/morserunner/), training software for ham radio operators interested in CW. It has been developed actively for years by Alex Shovkoplyas (VE3NEA) as freeware and its (Delphi Pascal) source code has been generously released on GitHub.

TL;DR: watch the video

[![Watch the video](https://img.youtube.com/vi/1tENliEvQwc/default.jpg)](https://www.youtube.com/embed/1tENliEvQwc)


## Collaborating and developing

This is an attempt at rebooting/rewriting/porting Morse Runner in JavaScript, as a webapp. It is based on the powerful audio library Web Audio (see https://web.dev/webaudio-intro/), which is the underlying layer for Fabian Kurz (DJ5CW)'s fantastic library (https://github.com/dj1yfk/jscwlib).


jscwlib should indeed make life extremely easy. See by yourself and appreciate Fabian's example for a pileup https://fkurz.net/ham/jscwlib/example/pileup.html . 



## Testing

Point your browser to [rcw.f4iey.fr](https://rcw.f4iey.fr/) to play and test. 
(or [here](https://mgiugliano.github.io/MorseRunnerJS/www/), demonstrating basic deployment through GitHub pages)

## Deploy with Docker

### Compose
```yml
version: "3.8"
services:
  morserunner:
    container_name: morserunner
    image: ghcr.io/f4iey/morserunnerjs:master
    ports:
        - "8080:80"
    restart: unless-stopped
```
### Docker run
```sh
docker run -d --name morserunner -p 8080:80 --restart unless-stopped ghcr.io/f4iey/morserunnerjs:master
```

You can check the page at [http://localhost:8080](#)
