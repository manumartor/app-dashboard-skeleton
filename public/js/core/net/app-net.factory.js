/**
 * JS for MaIOMan App Net Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.net')
.factory('$appNet', function($log, $http, appCfg, cfgAppNetIsSrvUpTimeout, cfgAppNetServerPingTestUri, cfgAppNetDownloadTestUri, cfgAppNetUploadTestUri){
  $log.log('App-core::$appNet ini');

  var services = {};
  
  /**
   * Define isNetUp services
   *
   * @return {bool} true if network is up or false if down
   **/
  services.isNetUp =  function(){ 
    $log.log('App-core::isNetUp ini');

    $log.log('App-core::isNetUp end');
    return navigator.onLine;
  };
  
  /**
   * Define isSrvUp services to do a ping to server for check if it's available
   *
   * @param {function} cbk function callback
   * @return {int} latency time if all was ok or false if not
   **/
  services.isSrvUp = function(cbk){
    $log.log('App-core::isSrvUp ini');
    
    //1. check if net is up
    if (!services.isNetUp){
      cbk(false);
      return false;
    }
    
    //2. head to blank.html file
    var start = new Date().getTime();
    var url = appCfg.getCfg('net_serverPingTestUri', cfgAppNetServerPingTestUri);
    $http.head(url, {
      headers: {'Content-type': 'application/octet-stream'},
      cache: 0,
      timeput: cfgAppNetIsSrvUpTimeout
    }).then(function(response){
        $log.log('App-core::isSrvUp response: ' + response);
        cbk((new Date().getTime() - start));
    }, function(error){
        $log.warn('App-core::isSrvUp error: ' + JSON.stringify(error));
        cbk(false);
    });
    
    $log.log('App-core::isSrvUp end');
  };
  
  /**
   * Define testSpeed services
   **/
  services.testSpeed = function(cbk){
    $log.log('App-core::testSpeed ini');
    
    //1. check if net is up
    if (!services.isNetUp){
      $log.log('App-core::testSpeed cancelled becouse net is down');
      cbk(false);
      return false;
    }
    
    //2. do a down test
    var start = new Date().getTime();
    services.testDownSpeed(function(downResp){
      if (!downResp){
        cbk(false);
        return false;
      }
      services.testUpSpeed(function(upResp){
        if (!upResp){
          cbk(false);
          return false;
        }
        
        //3. return response
        cbk({
          "downTest": downResp,
          "upTest": upResp,
          "duration": (new Date().getTime() - start)
        });
      });
    });
    //3. do a up test
    
    $log.log('App-core::testSpeed end');
  };
  
  /**
   * Define testDownSpeed services
   **/
  services.testDownSpeed = function(cbk){
    $log.log('App-core::testDownSpeed ini');
    
    //1. check if net is up
    if (!services.isNetUp){
      $log.log('App-core::testDownSpeed disabled becouse net is down');
      cbk(false);
      return false;
    }
    
    //2. download big bin file
    var start = new Date().getTime();
    var url = appCfg.getCfg('net_downloadTestUri', cfgAppNetDownloadTestUri) + '?id=' + start;
    $http.get(url, {
      headers: {'Content-type': 'application/octet-stream'},
      cache: 0
    }).then(function(response){
      //3. calculate bandwidth and return value
      var speed = calculateBandwidth((response.data || response).length, start);
      var latency = (new Date().getTime() - start);
          
      var testReturn = {
        "downSpeed": speed, 
        "downSpeedString": convertToMbps(speed) + " Mbps",
        "size": (response.data || response).length, 
        "sizeString": convertToMbps((response.data || response).length) + " Mb",
        "latency": latency,
        "latencyString": (Math.floor((latency / 1000) * 100) / 100) + " s"
      };
      $log.log('App-core::testDownSpeed response: ' + JSON.stringify(testReturn));
      cbk(testReturn);
    }, function(error){
      $log.error('App-core::testDownSpeed error: ' + JSON.stringify(error));
      cbk(false);
    });
    
    $log.log('App-core::testDownSpeed end');
  };
  
  /**
   * Define testUpSpeed services
   **/
  services.testUpSpeed = function(cbk){
    $log.log('App-core::testUpSpeed ini');
    
    //1. check if net is up
    if (!services.isNetUp){
      $log.log('App-core::testUpSpeed disabled becouse net is down');
      cbk(false);
      return false;
    }
    
    //2. generate randomly data
    var uploadDataSize = 5 * 1024 * 1024, uploadDataMaxSize = Number.MAX_VALUE;
    var uploadData = new Array(Math.min(uploadDataSize, uploadDataMaxSize));
		for (var i = 0; i < uploadData.length; i++) {
			uploadData[i] = Math.floor(Math.random() * 256);
		}
    
    //3. download big bin file
    var start = new Date().getTime();
    var url = appCfg.getCfg('net_uploadTestUri', cfgAppNetUploadTestUri) + '?id=' + start;
    $http.post(url, {
      data: uploadData,
      headers: {'Content-type': 'application/octet-stream'},
      cache: 0
    }).then(function(response){
      //4. calculate bandwidth and return value
      var speed = calculateBandwidth(uploadData.length, start);
      var latency = (new Date().getTime() - start);
      var testReturn = {
        "upSpeed": speed, 
        "upSpeedString": convertToMbps(speed) + " Mbps",
        "size": uploadData.length, 
        "sizeString": convertToMbps(uploadData.length) + " Mb", 
        "latency": latency,
        "latencystring": Math.floor((latency / 1000) * 100) / 100 + " s"
      };
      $log.log('App-core::testUpSpeed response: ' + JSON.stringify(testReturn));
      cbk(testReturn);
    }, function(error){
      $log.error('App-core::testUpSpeed error: ' + JSON.stringify(error));
      cbk(false);
    });
    
    $log.log('App-core::testUpSpeed end');
  };
  
  //
  // Other needed functions
  //
  
  /**
   * Calculates the bandwidth in bps (bits per second)
	 * @param size the size in bytes to be transfered
	 * @param startTime the time when the transfer started. The end time is 
	 * considered to be now.
   **/
  var calculateBandwidth = function(size, start){
    return (size * 8) / ((new Date().getTime() - start) / 1000);
  };
  
  var MEGABIT = 1000000;
  var convertToMbps = function(x) {
    return x < 0 || isNaN(x) ? x : Math.floor((x / MEGABIT) * 100) / 100;
  };
  
  var truncate = function(data, maxSize) {
		if (maxSize === undefined) {
			return;
		}
		if (data.length > maxSize) {
			if (data.substring) {
				data = data.substring(0, maxSize);
			} else {
				data.length = maxSize;
			}
		}
		return data;
	};

  $log.log('App-CORE::$appNet end');
  return services;
});