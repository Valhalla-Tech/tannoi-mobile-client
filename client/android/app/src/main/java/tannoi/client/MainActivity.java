package tannoi.client;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "client";
  }

  @Override
  protected void onStart() {
      super.onStart();
      RNBranchModule.initSession(getIntent().getData(), this);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    private Branch.BranchUniversalReferralInitListener branchReferralInitListener = new Branch.BranchUniversalReferralInitListener() {
    @Override public void onInitFinished(@Nullable BranchUniversalObject branchUniversalObject, @Nullable LinkProperties linkProperties, @Nullable BranchError error) {
        // do something with branchUniversalObject/linkProperties..
    }
    setIntent(intent);
  }
}
