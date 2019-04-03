package com.example.lior.milabapp;

import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

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
                String name = getIntent().getStringExtra(CONTACT_NAME);
                text.setText("We have connected your contacts! Your friend " + name + " has already taken three rides. Book one too!");
                progressBar.setVisibility(View.INVISIBLE);
                button.setVisibility(View.VISIBLE);
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
