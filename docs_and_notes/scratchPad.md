# Notes and understanding


## The new GUI

The HTML GUI closely emulates the (logic of the) original one:

1- (local) STATION parameters: Callsign, Speed, Pitch, Bandwidth, QSK
2- Band CONDITIONS parameters: QRN, QRM, QSB, Flut, LID's - not yet implemented
                               Activity - implemented
3- Run controls:               START/STOP buttons and timer settings
4- Log window (read-only):     not yet implemented
5- Operator:                   input text fields for QSO and logging
                               including buttons (CQ, AGN, NR, ETC.)


## The core functions

sendMSG()     -   handles all CW messages sent by the local station. It accepts
                  two arguments: MSG (string) the content of the message and
                  (optional) a callback function to launch upon message conclusion.


callsigns.js:       handles the random call signs generation
    parseMASTERSCP()                reads all MASTER.SCP into an array
    pickCall()                      returns a random call sign as a string
    LevenshteinDistance(a, b)       if a==b, returns -999, otherwise it computes 
                                    "dissimilarity" between strings as -..---.

    ASCII2morse(inputStr)           converts a string into -.--...- w/o spaces


gui.js:             handles the GUI update, events, interactions
    document.onkeydown              call backs are defined, for keyboard presses
    addEventListener                events (click/keyup) are defined for GUI elements
    GUI_updated(event)              this launches readGUI() when RETURN is released
    readGUI()                       reads all GUI params and stores them in global vars   
    writeGUI()                      the opposite of readGUI(), for future cookie use
    focus_CALL()                    makes the text field "CALL" in focus
    clear_CALL()                    clears the content of the text field "CALL"
    clear_fields()                      clears "CALL", "RST", and "Nr" fiels

qso.jl:             handles actual interactions between remote & local stations



createStation()     returns a struct with a single random station
playActivity()      plays all messages responding to the CQ
respondCall()       launches when the user presses RETURN and the theirCALL field is not empty
                    the user has in other words committed to respond to one of the callers
concludeQSO()


Calling CQ  ---------> triggers station(s) to appear and respond
Sending a callsign --> triggers the closest/exact station to come back (checkUserResponse)
                       it comes back with RST (QSO() function) or "DE callsign" (DE())














## Sound generation

From inspecting Contest.pas and Main.pas, I think the original MorseRunner works
by (continuously) creating a .wav file and then playing it back.

The number of samples of this signal is Ini.BufSize, whose def I failed to 
locate.

From a cursory inspection of the code contained in *Contest.pas*, I believe 
audio is largely if not entirely managed and synthesized in the complex Fourier
domain. For instance the background noise seems to be generated by 

    - create an array of N elements for the signal real part
    - create an array of N elements for the signal real part
    - init each elements with **unif.** distributed random numbers, in [-A ; A]
    - where A = 3 * NOISEAMP (NOISEAMP = 6000) 

    The atmospheric noise (QRN) is additionally rendered as it follows:

    1- increase by a factor 20 the limit A, but not of all elements of the array.
    This is done randomly (with prob 0.01 - read 1% of the elements only) 
    and acting only on the real part

    2- simulate a *burst*, randomly generating events (i.e. Stations.AddQrn) with
    probability 0.01

Note: this does NOT happen within a loop through time, since it is in the Fourier
domain. So there is no loop: the buffer is set at the start and its content 
manipulated before (I think) playback.

Maybe this strategy makes it very easy to "mix" signals as well as to change
bandwidth.




## Files comments

- Main.dfm  (GUI definition)
- Main.pas


## Generating the noise (our way)


Note: the code above solves numerically (by the Euler forward method) a
(stochastic) differential equation that acts as a low-pass filter:

dx/dt = -x/tau + u        x(t) is the output, u(t) is (white noise) input

Let's apply the Euler's formula, approximating derivatives with differences
x(k+1) - x(k) / Dt = -x(k)/tau + u(k)
x(k+1) = (1 - Dt/tau) * x(k) + Dt*u(k)

In the actual equation, the "Dt*u(k)" is written in a different way,
this is because strictly speaking a white noise cannot be samples and
some "careful massaging" of the probability theoretical properties is
needed to make the continuous time stochastic o.d.e. equivalent to the
discrete time stochastic iterative algebraic equation.

Note that in the Fourier domain, the filter equation becomes

X(w) jw = -X(w)/tau + U, then  X(w) (jw + 1/tau) = U 

This can be further rewritten as:

X(w) = tau / (jw tau + 1)  U

The magnitude of the transfer function is: tau * 1/sqrt(w^2 tau^2 + 1)
Therefore, changing tau does indeed change the cut-off frequency but also the
DC gain. To remedy this, one can modify the original equation as

dx/dt = -x/tau + u/tau    

But I am not sure this is the problem. Reducing the bandwidth, changes the total
power of the signal.