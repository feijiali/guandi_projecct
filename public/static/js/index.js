var storageKey = 'xmm_';

APIUtility.RegisterCommandListener(APIUtility.APICommand.SettingServer, setServeType);
APIUtility.RegisterCommandListener(APIUtility.APICommand.InitializeSuccees, InitializeSuccees);

APIUtility.RegisterCommandListener(APIUtility.APICommand.UnityAllReady, UnityAllReady);
APIUtility.RegisterCommandListener(APIUtility.APICommand.ChangeSceneType, ChangeSceneType);
APIUtility.RegisterCommandListener(APIUtility.APICommand.UnitProjectID, UnitProjectID);
APIUtility.RegisterCommandListener(APIUtility.APICommand.Inspection, Inspection);

APIUtility.RegisterCommandListener(APIUtility.APICommand.BridgeProgress, BridgeProgress);
APIUtility.RegisterCommandListener(APIUtility.APICommand.TunnelProgress, TunnelProgress);
APIUtility.RegisterCommandListener(APIUtility.APICommand.InitializeGIS, InitializeGIS);

APIUtility.RegisterCommandListener(APIUtility.APICommand.InitTunnelPrediction, InitTunnelPrediction);

APIUtility.RegisterCommandListener(APIUtility.APICommand.TunnelTerrainSwitchOn, TunnelTerrainSwitchOn);

APIUtility.RegisterCommandListener(APIUtility.APICommand.ChangePrediction, ChangePrediction);
APIUtility.RegisterCommandListener(APIUtility.APICommand.ShowBedDetail, ShowBedDetail);
APIUtility.RegisterCommandListener(APIUtility.APICommand.BackToGis, BackToGis);
APIUtility.RegisterCommandListener(APIUtility.APICommand.InitializeBIMBeam, InitializeBIMBeam);
function BackToGis(data) {
  if (window.bim_model) {
    window.bim_model.BackToGis(data);
  }
}
function InitializeBIMBeam(data) {
  if (window.bim_model) {
    window.bim_model.resize();
    window.bim_model.InitializeBIMBeam(data);
  }
}
function ShowBedDetail(data) {
  if (window.bim_model) {
    window.bim_model.ShowBedDetail(data);
  }
}

function ChangePrediction(data) {
  if (window.bim_model) {
    window.bim_model.changePrediction(data);
  }
}

function TunnelTerrainSwitchOn(data) {
  if (window.bim_model) {
    window.bim_model.tunnelTerrainSwitchOn(data);
  }
}

function _ExecuteCommand(message) {
  APIUtility._ExecuteCommand(message);
}

function InitTunnelPrediction() {
  console.log('U2A 通知系统端U3D已进入隧道地质超前预报场景');
  window.bim_model.InitTunnelPrediction();
}

function BridgeProgress(unitString) {
  console.log('桥梁加载完成，触发 bridgeCompleted 方法');
  let data = unitString.split('#@');
  data.unshift(2);
  if (window.bim_model) {
    window.bim_model.resize();
    window.bim_model.bridgeCompleted(data);
  } else {
    $('#bridgeCompleted').click();
  }
}
function TunnelProgress(unitString) {
  console.log('隧道加载完成，触发 tunnelCompleted 方法');
  let data = unitString.split('#@');
  data.unshift(1);
  if (window.bim_model) {
    window.bim_model.resize();
    window.bim_model.tunnelCompleted(data);
  } else {
    $('#tunnelCompleted').click();
  }
}

function InitializeGIS() {
  console.log('全线加载完成');
  if (window.bim_model) {
    window.bim_model.resize();
    window.bim_model.initializeGIS();
  } else {
    $('.location').click();
  }
}

function setServeType() {
  console.log('bim加载完成 通知客户端 设置资源环境 触发 settingServer 方法');
  if (window.bim_model) {
    window.bim_model.settingServer();
  } else {
    $('#settingServer').click();
  }
}
function Inspection(unitString) {
  console.log('点击bim中巡检的日志 触发 inspectionInfo 方法');
  let data = unitString.split('#@');
  localStorage.setItem(storageKey + 'inspectionData', JSON.stringify({ data: data }));

  if (window.bim_model) {
    window.bim_model.inspectionInfo();
  } else {
    $('#inspectionInfo').click();
  }
}

function UnitProjectID(unitString) {
  console.log('直接进入单位工程触发，unitProjectID 方法');
  let data = unitString.split('#@');
  localStorage.setItem(storageKey + 'unitData', JSON.stringify({ data: data }));

  if (window.bim_model) {
    window.bim_model.unitProjectID();
  } else {
    $('#unitProjectID').click();
  }
}

// 进入小场景
function ChangeSceneType(type) {
  console.log('进入小场景');
  localStorage.setItem(storageKey + 'sceneType', type);
  if (window.bim_model) {
    window.bim_model.changeSceneType(type);
  } else {
    $('#ChangeSceneType').click();
  }
}

//unityUI加载完成后调用的函数
function UnityAllReady() {
  console.log('u3d加载完成');
  if (window.bim_model) {
    window.bim_model.bimCompeleted();
  } else {
    $('.location').click();
  }
  //屏幕缩放监听
  window.onresize = function() {
    if (window.bim_model) {
      window.bim_model.resize();
    } else {
      $('#resize').click();
    }
  };
}

function InitializeSuccees() {
  console.log('InitializeSuccees...');
  if (window.bim_model) {
    window.bim_model.initializeSuccees();
  } else {
    $('.InitializeSuccees').click();
  }
}

document.oncontextmenu = function(e) {
  //阻止浏览器默认事件
  return false; //一般点击右键会出现浏览器默认的右键菜单，写了这句代码就可以阻止该默认事件。
};
