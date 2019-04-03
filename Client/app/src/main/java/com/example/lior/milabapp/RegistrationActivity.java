package com.example.lior.milabapp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.wafflecopter.multicontactpicker.ContactResult;
import com.wafflecopter.multicontactpicker.MultiContactPicker;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class RegistrationActivity extends AppCompatActivity {

    private static final int CONTACT_PICKER_REQUEST = 991;
    private static final int PERMISSION_REQUEST_CONTACT = 900;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);
        Button button = findViewById(R.id.next);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                askForContactPermission();
            }
        });
    }

    private void showContactsScreen() {
        new MultiContactPicker.Builder(this).showPickerForResult(CONTACT_PICKER_REQUEST);
    }

    public void askForContactPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            showContactsScreen();
            return;
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
            showContactsScreen();
            return;
        }

        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.READ_CONTACTS},
                PERMISSION_REQUEST_CONTACT);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[], @NonNull int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_CONTACT: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    showContactsScreen();
                } else {
                    Toast.makeText(RegistrationActivity.this, "No permission for contacts", Toast.LENGTH_LONG).show();
                }
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CONTACT_PICKER_REQUEST) {
            if (resultCode == RESULT_OK) {
                try {

                    List<ContactResult> results = MultiContactPicker.obtainResult(data);
                    JSONObject contactJson = new JSONObject();
                    JSONArray contactsArr = new JSONArray();

                    for (ContactResult result :
                            results) {
                        JSONObject contact = new JSONObject();
                        contact.put("name", result.getDisplayName());
                        if (!result.getPhoneNumbers().isEmpty()) {
                            contact.put("phone_num", result.getPhoneNumbers().get(0).getNumber());
                        }
                        contactsArr.put(contact);
                    }

                    contactJson.put("contacts", contactsArr);
                    Log.d("LIOR", "onActivityResult: " + contactJson.toString());
                    Intent intent = new Intent(RegistrationActivity.this, SearchContactsActivity.class);
                    intent.putExtra(SearchContactsActivity.CONTACT_NAME, contactJson.getJSONArray("contacts").getJSONObject(0).getString("name"));
                    startActivity(intent);
                    finish();
                } catch (JSONException ignored) {
                }
            } else if (resultCode == RESULT_CANCELED) {
                Toast.makeText(RegistrationActivity.this, "No contacts were selected", Toast.LENGTH_LONG).show();
            }
        }
    }

}
