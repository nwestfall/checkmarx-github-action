# Checkmarx Github Action ![Checkmarx](images/checkmarx.png) <img src="images/github.png" alt="Github" width="40" height="40">

Find security vulnerabilities in your Github Repository with Checkmarx using Github Action Integration.

![Checkmarx](images/checkmarx-big.png)

Checkmarx SAST (CxSAST) is an enterprise-grade flexible and accurate static analysis solution used to identify hundreds of security vulnerabilities in custom code. It is used by development, DevOps, and security teams to scan source code early in the SDLC, identify vulnerabilities and provide actionable insights to remediate them. Supporting over 22 coding and scripting languages and their frameworks with zero configuration to scan any language.

Please find more info in the official website: <a href="www.checkmarx.com">Checkmarx.com</a>

## Inputs

For using this action, there is a set of options that can be used, such as:

| Variable  | Value (Example) | Description | Type | Is Required* |
| ------------- | ------------- | ------------- |------------- | ------------- |
| cxServer | https://checkmarx.company.com | Checkmarx Server URL | String | Yes* |
| cxUsername | admin@cx | Checkmarx Username | String | Yes* |
| cxPassword | ${{ secrets.CX_PASSWORD }} | Checkmarx Password | Secure String | Yes* |
| cxTeam | \CxServer\SP\Company\TeamA | Checkmarx Team | String | Yes* |
| cxPreset | Checkmarx Default | Checkmarx Project Preset | String | No |
| cxHigh | 0 | Threshold for High Severity Vulnerabilities | Integer | No |
| cxMedium | 0 | Threshold for Medium Severity Vulnerabilities| Integer | No |
| cxLow | 0 | Threshold for Low Severity Vulnerabilities| Integer | No |

## Secrets

In order to securely configure this action, a password needs to be configured in Secrets section for later use in the YML template. 
Do the following steps:

- Go to your Repository
- Click on "Settings" Tab (requires you be the admin/owner of the repo)
- Click on "Secrets" section
- Add New Secret: 

| Secret | Value (Example) | Type | Is Required* |
| ------------- | ------------- |  ------------- | ------------- |
| CX_PASSWORD | ******** | Secure String | Yes* |

After setting this, you can access its value in YML template with the following format:

{{ secrets.VARIABLE_NAME }}

in this case:

{{ secrets.CX_PASSWORD }}

## Sample Github Action Workflow Config
```yml
name: Checkmarx SAST Scan
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v1
    - name: Checkmarx SAST Scan
      uses: miguelfreitas93/checkmarx-github-action@master
      with:
        cxServer: https://checkmarx.company.com
        cxUsername: First.Last@company.com
        cxPassword: ${{ secrets.CX_PASSWORD }}
        cxTeam: \CxServer\SP\Company\TeamA
        cxPreset: Checkmarx Default
        cxHigh: 0
        cxMedium: 0
        cxLow: 0
    - name: Upload PDF Artifact
      uses: actions/upload-artifact@master
      with:
        name: results.pdf
        path: results.pdf
    - name: Upload XML Artifact
      uses: actions/upload-artifact@master
      with:
        name: results.xml
        path: results.xml
```

### Notes:

- Make sure you do **Checkout** of the code, before Checkmarx Scan Step;
- PDF and XML produced will have always the name **"results.pdf"** or **"results.xml"**, respectively;

# License

MIT License

Copyright (c) 2019 Miguel Freitas