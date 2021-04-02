var IS_FLUTTER = true;

var selectedAppIconArtboards = {};
var selectedAppIconPlatforms = {};

var appIconsIOS = [
  {
    name: 'Icon-App-20x20@1x.png',
    size: 20,
  },
  {
    name: 'Icon-App-20x20@2x.png',
    size: 40,
  },
  {
    name: 'Icon-App-20x20@3x.png',
    size: 60,
  },
  {
    name: 'Icon-App-29x29@1x.png',
    size: 29,
  },
  {
    name: 'Icon-App-29x29@2x.png',
    size: 58,
  },
  {
    name: 'Icon-App-29x29@3x.png',
    size: 87,
  },
  {
    name: 'Icon-App-40x40@1x.png',
    size: 40,
  },
  {
    name: 'Icon-App-40x40@2x.png',
    size: 80,
  },
  {
    name: 'Icon-App-40x40@3x.png',
    size: 120,
  },
  {
    name: 'Icon-App-60x60@2x.png',
    size: 120,
  },
  {
    name: 'Icon-App-60x60@3x.png',
    size: 180,
  },
  {
    name: 'Icon-App-76x76@1x.png',
    size: 76,
  },
  {
    name: 'Icon-App-76x76@2x.png',
    size: 152,
  },
  {
    name: 'Icon-App-83.5x83.5@2x.png',
    size: 167,
  },
  {
    name: 'Icon-App-1024x1024@1x.png',
    size: 1024,
  },
];

var appIconsMacOS = [
  {
    name: 'app_icon_16.png',
    size: 16,
  },
  {
    name: 'app_icon_32.png',
    size: 32,
  },
  {
    name: 'app_icon_64.png',
    size: 64,
  },
  {
    name: 'app_icon_128.png',
    size: 128,
  },
  {
    name: 'app_icon_256.png',
    size: 256,
  },
  {
    name: 'app_icon_512.png',
    size: 512,
  },
  {
    name: 'app_icon_1024.png',
    size: 1024,
  },
];

var appIconsAndroid = [
  {
    name: 'mipmap-hdpi/ic_launcher.png',
    size: 72,
  },
  {
    name: 'mipmap-mdpi/ic_launcher.png',
    size: 48,
  },
  {
    name: 'mipmap-xhdpi/ic_launcher.png',
    size: 96,
  },
  {
    name: 'mipmap-xxhdpi/ic_launcher.png',
    size: 144,
  },
  {
    name: 'mipmap-xxxhdpi/ic_launcher.png',
    size: 192,
  },
];

var appIconsWeb = [
  {
    name: 'favicon.png',
    size: 16,
  },
  {
    name: 'icons/Icon-192.png',
    size: 192,
  },
  {
    name: 'icons/Icon-512.png',
    size: 512,
  },
];

var appIconsWindows = [
  {
    name: 'app_icon_16.png',
    size: 16,
  },
  {
    name: 'app_icon_32.png',
    size: 32,
  },
  {
    name: 'app_icon_48.png',
    size: 48,
  },
  {
    name: 'app_icon_256.png',
    size: 256,
  },
];

var appIconsWindowsExtended = [
  {
    name: 'app_icon_16.png',
    size: 16,
  },
  {
    name: 'app_icon_32.png',
    size: 32,
  },
  {
    name: 'app_icon_48.png',
    size: 48,
  },
  {
    name: 'app_icon_256.png',
    size: 256,
  },
  {
    name: 'app_icon_24.png',
    size: 24,
  },
  {
    name: 'app_icon_64.png',
    size: 64,
  },
  {
    name: 'app_icon_72.png',
    size: 72,
  },
  {
    name: 'app_icon_96.png',
    size: 96,
  },
  {
    name: 'app_icon_128.png',
    size: 128,
  },
  {
    name: 'app_icon_180.png',
    size: 180,
  },
];

var availablePlatforms = [
  {
    name: 'iOS',
    path: '/AppIcon.appiconset/',
    pathFlutter: '/ios/Runner/Assets.xcassets/AppIcon.appiconset/',
    appIcons: appIconsIOS,
  },
  {
    name: 'macOS',
    path: '/AppIcon.appiconset/',
    pathFlutter: '/macos/Runner/Assets.xcassets/AppIcon.appiconset/',
    appIcons: appIconsMacOS,
  },
  {
    name: 'Android',
    path: '/app/src/main/res/',
    pathFlutter: '/android/app/src/main/res/',
    appIcons: appIconsAndroid,
  },
  {
    name: 'Web',
    path: '/',
    pathFlutter: '/web',
    appIcons: appIconsWeb,
  },
  {
    name: 'Windows',
    path: '/',
    pathFlutter: '/windows/runner/resources/',
    appIcons: appIconsWindows,
  },
  {
    name: 'Windows (Extended)',
    path: '/',
    pathFlutter: '/windows/runner/resources',
    appIcons: appIconsWindowsExtended,
  },
];

var folder = Folder.selectDialog('Select export directory');
var document = app.activeDocument;

if (document && folder) {
  var dialog = new Window('dialog', 'Select assets and platforms for export');
  var appIconGroup = dialog.add('group');
  appIconGroup.alignChildren = 'top';

  var platformGroup = dialog.add('group');
  platformGroup.alignChildren = 'top';

  var frameworkGroup = dialog.add('group');
  frameworkGroup.alignChildren = 'top';

  createArtboardSelectionPanel('Select artboards to export as icons', selectedAppIconArtboards, appIconGroup);
  createPlatformSelectionPanel('Select platforms to generate icons for', selectedAppIconPlatforms, platformGroup);
  createFrameworkSelectionPanel('Select framework', frameworkGroup);

  var buttonGroup = dialog.add('group');
  var okButton = buttonGroup.add('button', undefined, 'Export');
  var cancelButton = buttonGroup.add('button', undefined, 'Cancel');

  okButton.onClick = function () {
    exportAppIcons(this.parent.parent);
    this.parent.parent.close();
  };

  cancelButton.onClick = function () {
    this.parent.parent.close();
  };

  dialog.show();
}

function exportAppIcons(win) {
  for (var artboardName in selectedAppIconArtboards) {
    var artboard = app.activeDocument.artboards.getByName(artboardName);
    var activeIndex = 0;
    while (!(app.activeDocument.artboards[activeIndex].name === artboardName)) {
      activeIndex++;
    }
    app.activeDocument.artboards.setActiveArtboardIndex(activeIndex);

    for (var platformName in selectedAppIconPlatforms) {
      var platform = selectedAppIconPlatforms[platformName];
      var expFolder = new Folder(folder.fsName + (IS_FLUTTER ? platform.pathFlutter : platform.path));
      if (!expFolder.exists) {
        alert('Folder "' + folder.fsName + platform.path + '" does not exist, exiting');
        win.close();
      }
      var appIconExports = platform.appIcons;
      for (var i = 0; i < appIconExports.length; i++) {
        var item = appIconExports[i];
        exportAppIcon(artboard, expFolder, item.name, item.size);
      }
    }
  }
}

function exportAppIcon(artboard, expFolder, name, iconSize) {
  var scale = (iconSize * 100) / Math.abs(artboard.artboardRect[1] - artboard.artboardRect[3]);

  if (app.documents.length > 0) {
    var exportOptions = new ExportOptionsPNG24();
    var type = ExportType.PNG24;
    var fileSpec = new File(expFolder.fsName + '/' + name);
    exportOptions.verticalScale = scale;
    exportOptions.horizontalScale = scale;
    exportOptions.antiAliasing = false;
    exportOptions.transparency = true;
    exportOptions.artBoardClipping = true;
    app.activeDocument.exportFile(fileSpec, type, exportOptions);
  }
}

function createArtboardSelectionPanel(name, selected, parent) {
  var panel = parent.add('panel', undefined, name);
  panel.alignChildren = 'left';
  panel.minimumSize.width = 300;
  panel.orientation = 'row';
  panel.alignChildren = 'top';

  var CHECKBOXES_PER_PANEL = 10;
  var totalPanels = Math.ceil(app.activeDocument.artboards.length / CHECKBOXES_PER_PANEL);
  var groups = [];
  for (var i = 0; i < totalPanels; i++) {
    var group = panel.add('group', undefined, name);
    group.orientation = 'column';
    group.alignChildren = 'left';
    groups.push(group);
  }

  for (var i = 0; i < app.activeDocument.artboards.length; i++) {
    var destGroup = groups[Math.floor(i / CHECKBOXES_PER_PANEL)];

    var cb = destGroup.add('checkbox', undefined, '\u00A0' + app.activeDocument.artboards[i].name);
    cb.item = app.activeDocument.artboards[i];
    cb.value = false;
    cb.onClick = function () {
      if (this.value) {
        selected[this.item.name] = this.item;
      } else {
        delete selected[this.item.name];
      }
    };
  }
}

function createPlatformSelectionPanel(name, selected, parent) {
  var panel = parent.add('panel', undefined, name);
  panel.alignChildren = 'left';
  panel.minimumSize.width = 400;
  for (var i = 0; i < availablePlatforms.length; i++) {
    var cb = panel.add('checkbox', undefined, '\u00A0' + availablePlatforms[i].name);
    cb.item = availablePlatforms[i];
    cb.value = false;
    cb.onClick = function () {
      if (this.value) {
        selected[this.item.name] = this.item;
      } else {
        delete selected[this.item.name];
      }
    };
  }
}

function createFrameworkSelectionPanel(name, parent) {
  var panel = parent.add('panel', undefined, name);
  panel.alignChildren = 'left';
  panel.minimumSize.width = 400;
  var cb = panel.add('checkbox', undefined, '\u00A0' + 'Flutter');
  cb.item = IS_FLUTTER;
  cb.value = IS_FLUTTER;
  cb.onClick = function () {
    IS_FLUTTER = this.value;
  };
}
