const utils = require('../utils/utils.js')
const inputs = require('../github/inputs.js')
const envs = process.env
const GITHUB_WORKSPACE = envs.GITHUB_WORKSPACE

function getOsaCmd(server, action, skipIfFail) {
    if (utils.isValidUrl(server) && utils.isValidAction(action)) {

        let credentials = inputs.getCredentials(skipIfFail)
        if (!utils.isValidString(credentials)) {
            return credentials
        }
        let project = inputs.getProject(skipIfFail)
        if (!utils.isValidString(project)) {
            return project
        }

        let high = inputs.getInt(inputs.CX_OSA_HIGH, false)
        let medium = inputs.getInt(inputs.CX_OSA_MEDIUM, false)
        let low = inputs.getInt(inputs.CX_OSA_LOW, false)
        let osaLocationPath = inputs.getString(inputs.CX_OSA_LOCATION_PATH, false)
        let osaArchiveToExtract = inputs.getString(inputs.CX_OSA_ARCHIVE_TO_EXTRACT, false)
        let osaFilesInclude = inputs.getString(inputs.CX_OSA_FILES_INCLUDE, false)
        let osaFilesExclude = inputs.getString(inputs.CX_OSA_FILES_EXCLUDE, false)
        let osaPathExclude = inputs.getString(inputs.CX_OSA_PATH_EXCLUDE, false)
        let osaReportHtml = inputs.getString(inputs.CX_OSA_REPORT_HTML, false)
        let osaReportPDF = inputs.getString(inputs.CX_OSA_REPORT_PDF, false)
        let osaDepth = inputs.getInt(inputs.CX_OSA_DEPTH, false)
        let executePackageDependency = inputs.getBoolean(inputs.CX_OSA_EXECUTE_PACKAGE_DEPENDENCY, false)
        let osaJson = inputs.getString(inputs.CX_OSA_JSON, false)
        let checkPolicy = inputs.getBoolean(inputs.CX_OSA_CHECK_POLICY, false)


        let command = action +
            " -CxServer " + server +
            credentials +
            " -ProjectName \"" + project + "\"" +
            " -LocationType folder" +
            " -LocationPath \"" + GITHUB_WORKSPACE + "\"" +
            " -EnableOsa"

        if (high >= 0) {
            command += " -OSAHigh " + high
        }
        if (medium >= 0) {
            command += " -OSAMedium " + medium
        }
        if (low >= 0) {
            command += " -OSALow " + low
        }
        if (osaDepth >= 0) {
            command += " -OsaScanDepth " + osaDepth
        }
        if (executePackageDependency && executePackageDependency != "false") {
            command += " -executepackagedependency"
        }
        if (checkPolicy && checkPolicy != "false") {
            command += " -CheckPolicy"
        }
        if (osaLocationPath) {
            command += " -OsaLocationPath \"" + osaLocationPath + "\""
        }
        if (osaArchiveToExtract) {
            command += " -OsaArchiveToExtract \"" + osaArchiveToExtract + "\""
        }
        if (osaFilesInclude) {
            command += " -OsaFilesInclude \"" + osaFilesInclude + "\""
        }
        if (osaFilesExclude) {
            command += " -OsaFilesExclude \"" + osaFilesExclude + "\""
        }
        if (osaPathExclude) {
            command += " -OsaPathExclude \"" + osaPathExclude + "\""
        }
        if (osaReportHtml) {
            command += " -OsaReportHtml \"" + osaReportHtml + "\""
        }
        if (osaReportPDF) {
            command += " -OsaReportPDF \"" + osaReportPDF + "\""
        }
        if (osaJson) {
            command += " -OsaJson \"" + osaJson + "\""
        }

        return command
    } else {
        return inputs.error(inputs.CX_SERVER, server, skipIfFail)
    }
}

module.exports = {
    getOsaCmd: getOsaCmd
}