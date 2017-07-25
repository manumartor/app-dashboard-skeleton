/**
 * JS for MaIOMan App Constants
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.core')
//core cfg(s)
.constant('$cfgAppDebug', 0)
.constant('$cfgAppWsInternal', 1)

// net cfg(s)
.constant('$cfgAppNetSpeedTestOnLoad', 0)
.constant('$cfgAppNetIsSrvUpTimeout', 5000)
.constant('$cfgAppNetServerPingTestUri', 'views/blank.html')
.constant('$cfgAppNetDownloadTestUri', 'js/core/net/resources/test.bin')
.constant('$cfgAppNetUploadTestUri', 'js/core/net/resources/post.php')
.constant('$cfgAppNetChangeAdvisorEnable', 1)
.constant('$cfgAppNetChangeAdvisorNotifyCloseTime', 5000)

// logger cfg(s)
.constant('$cfgAppLoggerToConsoleEnable', 0)
.constant('$cfgAppLoggerToConsoleLevel', 1)

.constant('$cfgAppLoggerToFileEnable', 1)
.constant('$cfgAppLoggerToFileLevel', 3)

// ui cfg(s)
.constant('$cfgAppUIMaskEnable', 1)
.constant('$cfgAppUILoadingMaskEnable', 1)
.value('$cfgAppUITimeClosedelay', 200)
.constant('$cfgAppUINotifyAlertProgramateCloseDefaultTime', 10000)