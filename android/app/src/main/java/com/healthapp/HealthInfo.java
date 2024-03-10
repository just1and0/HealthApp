package com.healthapp;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HealthInfo extends ReactContextBaseJavaModule {
    public HealthInfo(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void authorizeHealthKit(Callback callback) {
        callback.invoke(false);
    }

    @ReactMethod
    public void getHeartRate(Callback callback){
        callback.invoke(false);
    }

    @ReactMethod
    public void getBodyTemperature(Callback callback){
        callback.invoke(false);
    }

    @ReactMethod
    public void getOxygenSaturation(Callback callback){
        callback.invoke(false);
    }

    @ReactMethod
    public void getBloodPressureSystolic(Callback callback){
        callback.invoke(false);
    }

    @NonNull
    @Override
    public String getName() {
        return "HealthInfo";
    }

}


