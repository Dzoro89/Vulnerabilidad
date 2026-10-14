"""Prepare a static publication with metadata for the actual hosting URL."""
import argparse
import os
from pathlib import Path
import re
import shutil
from urllib.parse import urlsplit

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', required=True)
parser.add_argument('--url', default=os.environ.get('SITE_URL'))
args = parser.parse_args()

if not args.url:
    parser.error('Set SITE_URL or provide --url with the published website URL.')
site_url = args.url.rstrip('/')
parsed = urlsplit(site_url)
if parsed.scheme != 'https' or not parsed.netloc or parsed.query or parsed.fragment:
    parser.error('The publication URL must be an absolute HTTPS URL without query or fragment.')

root = Path(__file__).resolve().parents[1]
source = root / 'dist'
output = Path(args.output).resolve()
if output == root or output == source or root.is_relative_to(output) or output.is_relative_to(source):
    parser.error('The output must be a separate directory outside the source assets.')
if output.exists() and any(output.iterdir()):
    parser.error('The output directory must be empty; existing content is never removed.')

shutil.copytree(source, output, dirs_exist_ok=True, ignore=shutil.ignore_patterns('_headers'))
index = output / 'index.html'
markup = index.read_text(encoding='utf-8')
match = re.search(r'<link rel="canonical" href="([^"]+)"', markup)
if not match:
    parser.error('The source page has no canonical URL.')
previous_url = match.group(1).rstrip('/')
for relative in ['index.html', 'robots.txt', 'sitemap.xml']:
    file = output / relative
    file.write_text(file.read_text(encoding='utf-8').replace(previous_url, site_url), encoding='utf-8')
(output / '.nojekyll').touch()
print(f'Prepared static website at {output} for {site_url}')
