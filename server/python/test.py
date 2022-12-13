import sys
import json
d = json.loads(sys.argv[1])
d["python"] = "works"
print(d)
# print(json.dumps(d))
# simple argument echo script
# for v in sys.argv[1:]:
#   print(v)