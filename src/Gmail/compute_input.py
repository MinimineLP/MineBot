import sys, json, numpy as np
import gmail
import sys
import os

sys.path.append(os.path.join(os.path.dirname(sys.argv[0]), "subfolder"))

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    lines = read_in()

    np_lines = np.array(lines);

    to = np_lines[0]
    sender = np_lines[1]
    subject = np_lines[2]
    msgHtml = np_lines[3]
    msgPlain = np_lines[4]
    gmail.SendMessage(sender, to, subject, msgHtml, msgPlain)
if __name__ == '__main__':
    main()
