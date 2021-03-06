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
  console.log('U2A ???????????????U3D???????????????????????????????????????');
  window.bim_model.InitTunnelPrediction();
}

function BridgeProgress(unitString) {
  console.log('??????????????????????????? bridgeCompleted ??????');
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
  console.log('??????????????????????????? tunnelCompleted ??????');
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
  console.log('??????????????????');
  if (window.bim_model) {
    window.bim_model.resize();
    window.bim_model.initializeGIS();
  } else {
    $('.location').click();
  }
}

function setServeType() {
  console.log('bim???????????? ??????????????? ?????????????????? ?????? settingServer ??????');
  if (window.bim_model) {
    window.bim_model.settingServer();
  } else {
    $('#settingServer').click();
  }
}
function Inspection(unitString) {
  console.log('??????bim?????????????????? ?????? inspectionInfo ??????');
  let data = unitString.split('#@');
  localStorage.setItem(storageKey + 'inspectionData', JSON.stringify({ data: data }));

  if (window.bim_model) {
    window.bim_model.inspectionInfo();
  } else {
    $('#inspectionInfo').click();
  }
}

function UnitProjectID(unitString) {
  console.log('?????????????????????????????????unitProjectID ??????');
  let data = unitString.split('#@');
  localStorage.setItem(storageKey + 'unitData', JSON.stringify({ data: data }));

  if (window.bim_model) {
    window.bim_model.unitProjectID();
  } else {
    $('#unitProjectID').click();
  }
}

// ???????????????
function ChangeSceneType(type) {
  console.log('???????????????');
  localStorage.setItem(storageKey + 'sceneType', type);
  if (window.bim_model) {
    window.bim_model.changeSceneType(type);
  } else {
    $('#ChangeSceneType').click();
  }
}

//unityUI??????????????????????????????
function UnityAllReady() {
  console.log('u3d????????????');
  if (window.bim_model) {
    window.bim_model.bimCompeleted();
  } else {
    $('.location').click();
  }
  //??????????????????
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
  //???????????????????????????
  return false; //???????????????????????????????????????????????????????????????????????????????????????????????????????????????
};
