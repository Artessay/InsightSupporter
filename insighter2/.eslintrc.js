module.exports = {
  "rules": {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-labels': 'off',
    'camelcase': 'off',
    'quote-props': ['warn', 'consistent']
  },
  "overrides": [
        {
            "files": ["**/*.js"],
            "rules": {
                'no-unused-vars': 'off',
                'no-undef': 'off',
                'no-labels': 'off',
                "react-hooks/exhaustive-deps": "off"
            }
        }
    ]
}