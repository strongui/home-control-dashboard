package com.home.control.dashboard

import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import kotlinx.android.synthetic.main.activity_main.*


private const val REQUEST_FINE_LOCATION = 1
private var mGeolocationOrigin: String? = null;
private var mGeolocationCallback: GeolocationPermissions.Callback? = null;

class MainActivity : AppCompatActivity() {
    private var webView: WebView? = null;

    inner class MyWebChromeClient : WebChromeClient() {
        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            Log.d(
                "MyApplication", consoleMessage!!.message() + " -- From line "
                        + consoleMessage.lineNumber() + " of "
                        + consoleMessage.sourceId()
            );
            return super.onConsoleMessage(consoleMessage)
        }

        override fun onGeolocationPermissionsShowPrompt(
            origin: String?,
            callback: GeolocationPermissions.Callback?
        ) {
            Log.d("MyApplication", "WTF MAN-----------------------");
            var permFine = android.Manifest.permission.ACCESS_FINE_LOCATION;
            var permCoarse = android.Manifest.permission.ACCESS_COARSE_LOCATION;
            if ((ContextCompat.checkSelfPermission(this@MainActivity, permFine) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(this@MainActivity, permCoarse) == PackageManager.PERMISSION_GRANTED)
            ) {
                Log.d("MyApplication", "IS HWAT -----------------------");
                callback!!.invoke(origin, true, false)
            } else {

                if (!ActivityCompat.shouldShowRequestPermissionRationale(this@MainActivity, permFine)) {
                    // ask the user for permission
                    ActivityCompat.requestPermissions(
                        this@MainActivity,
                        arrayOf(permFine),
                        REQUEST_FINE_LOCATION
                    )
                }
                if (!ActivityCompat.shouldShowRequestPermissionRationale(this@MainActivity, permCoarse)) {
                    // ask the user for permission
                    ActivityCompat.requestPermissions(
                        this@MainActivity,
                        arrayOf(permCoarse),
                        REQUEST_FINE_LOCATION
                    )
                }

                // we will use these when user responds
                mGeolocationOrigin = origin
                mGeolocationCallback = callback
            }

            return super.onGeolocationPermissionsShowPrompt(origin, callback)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        Log.d("MyApplication", "ARE WE THER EYET?? -----------------------");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        when (requestCode) {
            REQUEST_FINE_LOCATION -> {
                var allow = false
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // user has allowed this permission
                    allow = true
                }
                mGeolocationCallback?.invoke(
                    mGeolocationOrigin,
                    allow,
                    false
                )
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView = findViewById<View>(R.id.webview) as WebView
        webView!!.settings.javaScriptEnabled = true;
        webView!!.settings.javaScriptCanOpenWindowsAutomatically = true;
        webView!!.settings.domStorageEnabled = true;
        webView!!.settings.setGeolocationEnabled(true)
        webView!!.webViewClient = WebViewClient()
        webView!!.webChromeClient = MyWebChromeClient()

        webView!!.clearCache(true)
        webview!!.clearHistory()
        // webView!!.loadUrl("https://hcc.amirkaramuja.com")
        webview!!.loadUrl("file:///android_asset/index.html");

    }

    override fun onBackPressed() {
        if (webView!!.canGoBack()) {
            webView!!.goBack();
        } else {
            super.onBackPressed()
        }
    }
}

