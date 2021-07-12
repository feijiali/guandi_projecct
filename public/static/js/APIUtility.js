/// <summary>
/// 命令协议号
const APIUtility = function() {};
// 场景枚举定义
// public enum SceneType {
// 	Gis = 0,
// 	Tunnel = 1,
// 	Bridge = 2,
// 	Beam = 3
// }

/// </summary>
// 准备要做的操作，但是以为没有初始化所以没有做，待初始化完成之后做的操作命令
APIUtility.APICommand = {
  /// Unity调用Web
  SettingServer: 0, // 参数1：string，服务器域名，即接口名之前的字符串，
  InitializeSuccees: 1, // U2A Unity系统管理器初始化完成时通知原生系统，请求用户信息以初始化网络通讯模块。
  ChangeSceneToEmpty: 2, // A2U 通知Unity3D切换到空场景，降低性能开销。 参数1：int，场景索引，由场景配置决定。参数2：可选，场景数据
  SetUserData: 3, // 通知Unity3D设置用户信息 参数：对象，用户数据对象
  TokenNotValid: 4, //通知系统段Token失效，一般在网络请求时发现被挤下线时使用
  ShowLoadingUI: 5, //通知APP，U3D显示或隐藏加载界面 参数1：int，0隐藏，1显示
  UnityAllReady: 6, //通知系统端 加载完成
  ChangeSceneType: 7, //通知系统端已经进入小场景 参数1：int，场景类型
  Inspection: 9, //检查的信息展示框控制
  InitTunnelPrediction: 8000, // 隧道地质超前预报
  ChangePerdictionPile: 8002, // 根据桩号切换地质预报
  ChangePrediction: 8003, // 切换地质预报
  InitializeGIS: 1000, //通知U3D加载GIS场景 参数1：对象，GIS数据
  FocusToTarget: 1001, // 通知U3D跳转到指定索引的目标  参数1：int，目标索引，由GIS配置决定
  SetCameraControlEnabled: 1002, //通知U3D是否启用摄相机控制组件 参数1：int，0禁用，1启用
  BackToGis: 1000, //通知U3D返回全线场景
  UnitProjectID: 1004, //通知web项目工程的id
  BridgeProgress: 2000, //通知U3D进入查看桥梁进度场景。 参数1：int，桥梁ID
  BridgeTerrainSwitchOn: 2001, //通知U3D桥梁地形的显隐
  BridgeCameraSwitch: 2002, //A2U 通知U3D切换桥梁场景的镜头朝向及位置，参数1：int，桥梁二级id
  TunnelProgress: 3000, //通知U3D进入查看隧道进度场景。参数1：int，隧道ID
  BeamShow: 4000, //通知U3D进入梁场场景 参数1：int，梁场ID
  TunnelTerrainSwitchOn: 3001,
  ShowBridgeUnitDetail: 2010,
  ShowMessageBox: 10000, //A2U U3D通知系统端弹出消息提示参数1：string，要显示的文本消息。
  ChangeScreenResolution: 10100, //网页分辨率变化 参数1：int，宽像素 参数2：int，高像素
  SetTargetFPS: 10101, // 通知Unity修改每秒渲染帧率 参数1：int，每秒最大渲染帧率
  CaptureAllKeyboardInput: 10200, //通知U3D启用键盘输入事件 参数1：int，0 禁用，1 启用
  ShowGisTunnelProgress: 1007,
  InitializeBIMBeam: 4000,
  ShowBedDetail: 4001,
  ShowBeamDetail: 4002,
  ShowBeamProgressSummary: 4003
};
/// <summary>
/// 分隔符标志定义
/// </summary>
APIUtility.SPLIT_FLAG = '#@';
/// <summary>
/// Unity3D接收消息的对象名
/// </summary>
APIUtility.GAME_OBJECT_NAME = 'RootManager';
/// <summary>
/// Unity3D接收消息的函数名
/// </summary>
APIUtility.EXECUTE_COMMAND_FUNCTION_NAME = 'ExecuteCommand';

/// <summary>
/// 命令回调字典
/// </summary>
APIUtility.m_DictOnReceivedCommand = new Array();

/// <summary>
/// 初始化函数
/// </summary>
APIUtility.Initialize = function() {
  APIUtility.RegisterCommandListener(APIUtility.APICommand.WebScreenChanged, APIUtility.webScreenChanged);
  APIUtility.RegisterCommandListener(APIUtility.APICommand.CaptureAllKeyboardInput, APIUtility.captureAllKeyboardInput);
};

APIUtility.webScreenChanged = function(dataStr) {
  console.log('webScreenChanged');

  //todo
};

APIUtility.captureAllKeyboardInput = function(dataStr) {
  console.log('captureAllKeyboardInput');

  //todo
};

/// <summary>
/// 通用内部通讯发送接口
/// </summary>
APIUtility.SendCommand = function(command, arrayObject, that) {
  console.log('web SendCommand : ' + command);
  var message = APIUtility.GenerateMessage(command, arrayObject);

  //引用UnityLoader
  window.bim_model.gameInstance.SendMessage(
    APIUtility.GAME_OBJECT_NAME,
    APIUtility.EXECUTE_COMMAND_FUNCTION_NAME,
    message
  );
};

APIUtility.initBim = function(that) {
  if (window.bim_model) {
    window.bim_model.load_animation();
    window.bim_model.gameInstance = UnityLoader.instantiate('gameContainer', UnityWebGL, {
      onProgress: () => {}
    });
  }

  // APIUtility.Initialize();
};
/// <summary>
/// 通用内部通讯接收接口
/// </summary>
/// <param name="message">接收到的字符串消息</param>
APIUtility._ExecuteCommand = function(message) {
  console.log('ExecuteCommand : ' + message);
  var params = APIUtility.SplitMessage(message);
  if (params == null) {
    console.log('Failed to Split message! ' + message);
    return;
  }
  var command = params[0];
  var dataStr = params[1];
  var callback = APIUtility.m_DictOnReceivedCommand[command];
  if (!callback) {
    console.log('Command ' + command + ' has not been registered!');
    return;
  }
  callback(dataStr);
};

/// <summary>
/// 注册命令回调监听器
/// </summary>
/// <param name="command">APICommand</param>
/// <param name="OnReceivedCommand">收到命令时执行的函数</param>
APIUtility.RegisterCommandListener = function(command, OnReceivedCommand) {
  if (APIUtility.m_DictOnReceivedCommand[command] != undefined) {
    console.log('Command is already exists! ' + command);
    return;
  }
  APIUtility.m_DictOnReceivedCommand[command] = OnReceivedCommand;
};

/// <summary>
/// 生成通讯消息
/// </summary>
/// <param name="command">APICommand</param>
/// <param name="data">对象数组</param>
/// <returns></returns>
APIUtility.GenerateMessage = function(command, data) {
  var message = command;
  if (data != null) {
    var type = typeof data;
    if (type != 'object') {
      message += APIUtility.SPLIT_FLAG;
      message += data;
    } else {
      var length = data.length;
      for (var i = 0; i < length; i++) {
        message += APIUtility.SPLIT_FLAG;

        var dataObj = data[i];
        var typeCode = typeof dataObj;

        if (typeCode == 'object') {
          //对象类型序列化为Json
          message += JSON.stringify(dataObj);
          // if(!dataObj instanceof Array) {
          // 	message += JSON.stringify(dataObj);;
          // }
        } else if (typeCode == 'string') {
          //字符串类型直接拼接
          message += dataObj;
        } //其余类型toString再拼接
        else {
          message += dataObj.toString();
        }
      }
    }
  }

  return message;
};

/// <summary>
/// 拆分通讯信息
/// </summary>
/// <param name="message">接收到的字符串消息</param>
/// <param name="command">命令</param>
/// <param name="dataStr">消息体</param>
/// <returns></returns>
APIUtility.SplitMessage = function(message) {
  message = String(message);
  var command = APIUtility.APICommand.None;
  var dataStr = '';
  if (message == '') {
    console.log('ExecuteCommand received none command or null message!');
    return null;
  }
  var separatorIndex = message.indexOf(APIUtility.SPLIT_FLAG);
  if (separatorIndex > 0) {
    command = parseInt(message.substring(0, separatorIndex));

    separatorIndex += APIUtility.SPLIT_FLAG.length;
    if (separatorIndex < message.length) {
      dataStr = message.substring(separatorIndex);
    } else {
      dataStr = '';
    }
  } else {
    command = parseInt(message);
  }
  var array = [command, dataStr];
  return array;
};
