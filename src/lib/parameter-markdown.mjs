import data from '../data/parameters.json' with { type: 'json' };

// Descriptions are already authored as Markdown in parameters.json.
const cell = value => value.replace(/(?<!\\)\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
const code = value => {
  const delimiter = '`'.repeat(Math.max(0, ...(value.match(/`+/g) || []).map(run => run.length)) + 1);
  return `${delimiter}${value.includes('`') ? ' ' : ''}${value}${value.includes('`') ? ' ' : ''}${delimiter}`;
};
export function parameterMarkdown(parameters, { namePrefix = '', nameHeading = 'Name' } = {}) {
  const rows = parameters.map(parameter => [
    `[${code(namePrefix + parameter.name)}](${parameter.link.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29')})`,
    code(parameter.type), parameter.description,
  ]);
  return [[nameHeading, 'Type', 'Description'], ['---', '---', '---'], ...rows]
    .map(row => `| ${row.map(cell).join(' | ')} |`).join('\n');
}

export function selectParameters({ context = 'api', includePrimary = false } = {}) {
  return data.parameters.filter(parameter =>
    (parameter.additional || includePrimary) && (context === 'api'
      ? parameter.support.html || parameter.support.url
      : parameter.support[context])
  );
}
