package com.example.lior.milabapp;

import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class SearchContactsActivity extends AppCompatActivity {

    public static final String CONTACT_NAME = "contact_name";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_contacts);
        final TextView text = findViewById(R.id.text);
        final ProgressBar progressBar = findViewById(R.id.progressBar);
        final Button button = findViewById(R.id.next);
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                String contact_json = getIntent().getStringExtra(CONTACT_NAME);
                JSONObject contact_jsons = null;
                //try{
                    //contact_jsons = new JSONObject(getIntent().getStringExtra("random_arr"));
                    text.setText("We have connected your contacts! Your friend Donald has already taken three rides. Book one too!");
                    progressBar.setVisibility(View.INVISIBLE);
                    button.setVisibility(View.VISIBLE);
//                } catch (JSONException e){
//                    Log.d("LIOR", "Eror in json");
//                }
                button.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent intent = new Intent(SearchContactsActivity.this, MainActivity.class);
                        startActivity(intent);
                        finish();
                    }
                });
            }
        }, 2000);
    }
}
