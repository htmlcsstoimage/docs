import data from '../data/parameters.json' with { type: 'json' };

// Descriptions are already authored as Markdown in parameters.json.
const cell = value => value.replace(/(?<!\\)\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
const code = value => {
  const delimiter = '`'.repeat(Math.max(0, ...(value.match(/`+/g) || []).map(run => run.length)) + 1);
  return `${delimiter}${value.includes('`') ? ' ' : ''}${value}${value.includes('`') ? ' ' : ''}${delimiter}`;
};
export const supportsImages = parameter => parameter.support.html || parameter.support.url;
export const supportsRecordings = parameter => parameter.support.recording_html || parameter.support.recording_url;

export function parameterMarkdown(parameters, { namePrefix = '', nameHeading = 'Name', applies = false } = {}) {
  const rows = parameters.map(parameter => [
    `[${code(namePrefix + parameter.name)}](${parameter.link.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29')})`,
    ...(applies ? [[supportsImages(parameter) && 'Images', supportsRecordings(parameter) && 'Recordings'].filter(Boolean).join(', ')] : []),
    code(parameter.type), parameter.description,
  ]);
  const header = applies ? [nameHeading, 'Works with', 'Type', 'Description'] : [nameHeading, 'Type', 'Description'];
  return [header, header.map(() => '---'), ...rows]
    .map(row => `| ${row.map(cell).join(' | ')} |`).join('\n');
}

// `api` covers image parameters, `recording` covers HTML/CSS or URL recording parameters, and `all` covers both.
const contextFilters = {
  api: supportsImages,
  recording: supportsRecordings,
  all: parameter => supportsImages(parameter) || supportsRecordings(parameter),
};

export function selectParameters({ context = 'api', includePrimary = false } = {}) {
  const supports = contextFilters[context] ?? (parameter => parameter.support[context]);
  return data.parameters.filter(parameter => (parameter.additional || includePrimary) && supports(parameter));
}
