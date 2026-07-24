export default {
    parseRegex: /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/,
    searchString: /^[ \t]*import\b.*from\s+['"]\.[^'"]*['"];/gm
};
