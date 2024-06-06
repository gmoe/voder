# Voder Speech Synthesizer (1939)

The Voder was an early attempt at speech synthesis developed by Bell Telephone
Laboratory for the 1939 New York World's Fair. Controlled by hand, the operator
manually forms each syllable using complex button sequences, and it would take
about a year of practice to able to produce fluid speech. This website allows
you to put yourself in the shoes of the women who taught themselves to operate
Voder.

# Development

It's recommended that you use [NVM][nvm] to manage your Node version, but really
anything past v18.x should work just fine.

```sh
# brew install node nvm (or whatever package manager is relevant to your system)
nvm install ; nvm use
npm install ; npm start
```

This command will dynamically rebuild the app on source file changes. If you
are maintaing your own fork, then deploying new versions of the app to GitHub
is similarly easy:

```sh
npm run deploy
```

[nvm]: https://github.com/nvm-sh/nvm
