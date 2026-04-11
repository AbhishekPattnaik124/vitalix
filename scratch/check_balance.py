
content = open("frontend/src/App.jsx", "r", encoding="utf-8").read()
open_braces = content.count("{")
close_braces = content.count("}")
print(f"Braces Diff: {open_braces - close_braces}")
open_parens = content.count("(")
close_parens = content.count(")")
print(f"Parens Diff: {open_parens - close_parens}")
