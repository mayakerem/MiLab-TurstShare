package com.example.lior.milabapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class Results extends AppCompatActivity {
    public static final String CONTACT_NAME = "contact_name";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_results);

        String contacts = getIntent().getStringExtra(SearchContactsActivity.CONTACT_NAME);
        Log.d("LIOR", contacts);


//            try {


//            } catch (JSONException e) {
//                Log.d("LIOR", "Eror in json");
//
//            }


        User[] drivers = new User[6];

        //Reference to all the names
        TextView user1 = (TextView) findViewById(R.id.name1);
        TextView user2 = (TextView) findViewById(R.id.name2);
        TextView user3 = (TextView) findViewById(R.id.name3);
        TextView user4 = (TextView) findViewById(R.id.name4);
        TextView user5 = (TextView) findViewById(R.id.name5);
        TextView user6 = (TextView) findViewById(R.id.name6);

        //Updating names
        user1.setText("User 1");
        user2.setText("User 2");
        user3.setText("User 3");
        user4.setText("Uesr 4");
        user5.setText("User 5");
        user6.setText("User 6");

    }




    }

