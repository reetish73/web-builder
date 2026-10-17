"""Package each skill as a ZIP for upload in Claude Desktop (Settings > Capabilities > Skills).

Usage: python scripts/build_zips.py   ->  dist/<skill>.zip
Each ZIP holds the skill folder plus THIRD_PARTY.md and the license files, so notices travel with it.
"""
import pathlib
import zipfile

root = pathlib.Path(__file__).resolve().parent.parent
dist = root / "dist"
dist.mkdir(exist_ok=True)
extras = [root / "THIRD_PARTY.md", *sorted((root / "licenses").glob("*"))]

for skill in sorted(p for p in (root / "skills").iterdir() if (p / "SKILL.md").exists()):
    out = dist / f"{skill.name}.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(skill.rglob("*")):
            if f.is_file():
                z.write(f, f"{skill.name}/{f.relative_to(skill).as_posix()}")
        for f in extras:
            z.write(f, f"{skill.name}/licenses/{f.name}" if f.parent.name == "licenses" else f"{skill.name}/{f.name}")
    print(out.relative_to(root))
