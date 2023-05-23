import wave

song = wave.open("song.wav", mode='rb')
frame_bytes = bytearray(list(song.readframes(song.getnframes())))

flag = str(open('./flag.txt', 'rb').read().strip())
flag = flag + int((len(frame_bytes)-(len(flag)*8*8))/8) *'#'

bits = list(map(int, ''.join([bin(ord(i)).lstrip('0b').rjust(8,'0') for i in flag])))

for i, bit in enumerate(bits):
    frame_bytes[i] = (frame_bytes[i] & 254) | bit

frame_modified = bytes(frame_bytes)

with wave.open('challenge.wav', 'wb') as fd:
    fd.setparams(song.getparams())
    fd.writeframes(frame_modified)
song.close()