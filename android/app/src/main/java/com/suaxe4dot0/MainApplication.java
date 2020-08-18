package com.station4dot0;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import java.util.Arrays;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import com.airbnb.android.react.maps.MapsPackage;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;

import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new MapsPackage(),
            new RNFusedLocationPackage(), 
            new ImagePickerPackage(),
            new ReactNativeFirebaseAppPackage(),
            new ReactNativeFirebaseMessagingPackage(),
            new ReactNativePushNotificationPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RNGeocoderPackage()

        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
